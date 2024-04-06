import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CoreRepositoryEnum } from '@shared/enums';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { TransactionDetailEntity } from '../entities/transaction-detail.entity';

@Injectable()
export class TransactionDetailsService {
  constructor(@Inject(CoreRepositoryEnum.TRANSACTION_DETAIL_REPOSITORY) private readonly repository: Repository<TransactionDetailEntity>) {
  }

  async create(transactionId: string, payload: any): Promise<any> {
    const newEntity = this.repository.create();
    newEntity.transactionId = transactionId;
    newEntity.productId = payload.product.id;
    newEntity.observation = payload.observation;
    newEntity.quantity = payload.quantity;

    return await this.repository.save(newEntity);
  }

  async update(id: string, payload: any): Promise<any> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    entity.transactionId = payload.transactionId;
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

  async remove(id: string): Promise<TransactionDetailEntity> {
    const data = await this.repository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.repository.softRemove(data);
  }


}