import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionEntity } from '../entities/transaction.entity';
import { CoreRepositoryEnum } from '@shared/enums';
import { Repository } from 'typeorm';
import { TransactionDetailsService } from './transaction-datails.service';
import { SignaturesService } from './signatures.service';
import { ProductEntity } from '@core/entities';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(CoreRepositoryEnum.TRANSACTION_REPOSITORY) private readonly repository: Repository<TransactionEntity>,
    @Inject(CoreRepositoryEnum.PRODUCT_REPOSITORY) private readonly productRepository: Repository<ProductEntity>,
    private readonly transactionDetailsService: TransactionDetailsService,
    private readonly signaturesService: SignaturesService,
  ) {
  }

  async create(userId: string, payload: any): Promise<any> {
    const newEntity = this.repository.create();
    newEntity.code = payload.code;
    newEntity.description = payload.description;
    newEntity.date = payload.date;
    newEntity.type = payload.type;

    const transactionCreated = await this.repository.save(newEntity);

    for (const item of payload.transactionDetails) {
      await this.transactionDetailsService.create(transactionCreated.id, item);

      const product = await this.productRepository.findOneBy({ id: item.product.id });

      if (payload.type) {
        product.stock += item.quantity;
      } else {
        product.stock -= item.quantity;
      }

      await this.productRepository.save(product);
    }

    await this.signaturesService.create(transactionCreated.id, payload, userId);

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
    entity.type = payload.type;

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

  async remove(id: string): Promise<TransactionEntity> {
    const data = await this.repository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.repository.softRemove(data);
  }

}