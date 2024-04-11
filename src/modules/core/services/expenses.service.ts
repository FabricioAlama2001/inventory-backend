import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CoreRepositoryEnum } from '@shared/enums';
import { Repository } from 'typeorm';
import { TransactionOutDetailsService } from './transaction-out-datails.service';
import { SignaturesService } from './signatures.service';
import { ExpenseEntity, ProductEntity } from '@core/entities';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject(CoreRepositoryEnum.EXPENSE_REPOSITORY) private readonly repository: Repository<ExpenseEntity>,
    @Inject(CoreRepositoryEnum.PRODUCT_REPOSITORY) private readonly productRepository: Repository<ProductEntity>,
    private readonly transactionDetailsService: TransactionOutDetailsService,
    private readonly signaturesService: SignaturesService,
  ) {
  }

  async create(userId: string, payload: any): Promise<any> {
    const newEntity = this.repository.create();
    newEntity.code = payload.code;
    newEntity.description = payload.description;
    newEntity.date = payload.date;

    const transactionCreated = await this.repository.save(newEntity);

    for (const item of payload.transactionDetails) {
      await this.transactionDetailsService.create(transactionCreated, item);

      const product = await this.productRepository.findOneBy({ id: item.product.id });
      product.stock -= Math.abs(item.quantity);

      await this.productRepository.save(product);
    }

    await this.signaturesService.createExpenseSignatura(transactionCreated.id, payload, userId);

    return transactionCreated;
  }

  async update(id: string, payload: any): Promise<any> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    entity.code = payload.code;
    entity.description = payload.description;
    entity.date = payload.date;

    return await this.repository.save(entity);
  }

  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    return entity;
  }

  async findAll(): Promise<any> {
    const entities = await this.repository.find({
      relations: { signature: { authorizer: true, dispatcher: true, receiver: true } },
    });

    return entities;

  }

  async remove(id: string): Promise<ExpenseEntity> {
    const data = await this.repository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.repository.softRemove(data);
  }

}