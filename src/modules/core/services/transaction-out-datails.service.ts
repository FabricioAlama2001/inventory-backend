import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CoreRepositoryEnum } from '@shared/enums';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { TransactionOutDetailEntity } from '../entities/transaction-out-detail.entity';
import { ExpenseEntity } from '../entities/expense.entity';

@Injectable()
export class TransactionOutDetailsService {
  constructor(@Inject(CoreRepositoryEnum.TRANSACTION_OUT_DETAIL_REPOSITORY) private readonly repository: Repository<TransactionOutDetailEntity>) {
  }

  async create(expenses: ExpenseEntity, payload: any): Promise<any> {
    const newEntity = this.repository.create();
    newEntity.expenseId = expenses.id;
    newEntity.productId = payload.product.id;
    newEntity.observation = payload.observation;

    if (expenses.enabled) {
      newEntity.quantity = Math.abs(payload.quantity);
    } else {
      newEntity.quantity = -Math.abs(payload.quantity);
    }

    return await this.repository.save(newEntity);
  }

  async update(id: string, payload: any): Promise<any> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    entity.expenseId = payload.expensesId;
    entity.productId = payload.productId;
    entity.observation = payload.observation;
    entity.quantity = payload.quantity;


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
    const entities = await this.repository.find();

    return entities;

  }

  async remove(id: string): Promise<TransactionOutDetailEntity> {
    const data = await this.repository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.repository.softRemove(data);
  }


}