import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CoreRepositoryEnum } from '@shared/enums';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { SignatureEntity } from '../entities/signature.entity';

@Injectable()
export class SignaturesService {
  constructor(@Inject(CoreRepositoryEnum.SIGNATURE_REPOSITORY) private readonly repository: Repository<SignatureEntity>) {
  }

  async createIncomeSignature(incomeId: string, payload: any, userId: string): Promise<any> {
    const newEntity = this.repository.create();
    newEntity.incomeId = incomeId;
    newEntity.authorizerId = payload.user.id;
    newEntity.dispatcherId = userId;
    newEntity.receiverId = payload.client.id;

    return await this.repository.save(newEntity);
  }

  async createExpenseSignatura(expenseId: string, payload: any, userId: string): Promise<any> {
    const newEntity = this.repository.create();
    newEntity.expenseId = expenseId;
    newEntity.authorizerId = payload.user.id;
    newEntity.dispatcherId = userId;
    newEntity.receiverId = payload.client.id;

    return await this.repository.save(newEntity);
  }

  async update(id: string, payload: any): Promise<any> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    entity.authorizerId = payload.authorizerId;
    entity.dispatcherId = payload.dispatcherId;
    entity.receiverId = payload.receiverId;
    entity.modelId = payload.modelId;
    return await this.repository.save(entity);
  }

}