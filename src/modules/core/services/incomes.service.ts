import { Inject, Injectable, NotFoundException } from '@nestjs/common';

;
import { CoreRepositoryEnum } from '@shared/enums';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { SignaturesService } from './signatures.service';
import { IncomeEntity, ProductEntity } from '@core/entities';
import { TransactionInDetailsService } from './transaction-in-datails.service';
import { ServiceResponseHttpModel } from '@shared/models';
import { PaginationDto } from '@core/dto';

@Injectable()
export class IncomesService {
  constructor(
    @Inject(CoreRepositoryEnum.INCOME_REPOSITORY) private readonly repository: Repository<IncomeEntity>,
    @Inject(CoreRepositoryEnum.PRODUCT_REPOSITORY) private readonly productRepository: Repository<ProductEntity>,
    private readonly transactionInDetailsService: TransactionInDetailsService,
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
      await this.transactionInDetailsService.create(transactionCreated, item);

      const product = await this.productRepository.findOneBy({ id: item.product.id });

      await this.productRepository.save(product);
    }

    await this.signaturesService.createIncomeSignature(transactionCreated.id, payload, userId);

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
    const entity = await this.repository.findOne({
      relations: {
        signature: { authorizer: true, dispatcher: true, receiver: true },
        transactionInDetails: { product: true },
      },
      where: { id },
    });

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

  async remove(id: string): Promise<IncomeEntity> {
    const data = await this.repository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.repository.softRemove(data);
  }

  async findIncomes(params?: any): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    return { data: [], pagination: null };
  }

  private async paginateAndFilter(params: any): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<IncomeEntity> | FindOptionsWhere<IncomeEntity>[];
    where = {};
    let { page, search } = params;

    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];

      where.push({
        signature: {
          authorizer: {
            identification: ILike(`%${search}%`),
          },
        },
      });

      where.push({
        signature: {
          authorizer: {
            name: ILike(`%${search}%`),
          },
        },
      });

      where.push({
        signature: {
          authorizer: {
            lastname: ILike(`%${search}%`),
          },
        },
      });

      where.push({
        signature: {
          receiver: {
            identification: ILike(`%${search}%`),
          },
        },
      });

      where.push({
        signature: {
          receiver: {
            name: ILike(`%${search}%`),
          },
        },
      });

      where.push({
        signature: {
          receiver: {
            lastname: ILike(`%${search}%`),
          },
        },
      });

      where.push({
        signature: {
          dispatcher: {
            identification: ILike(`%${search}%`),
          },
        },
      });

      where.push({
        signature: {
          dispatcher: {
            name: ILike(`%${search}%`),
          },
        },
      });

      where.push({
        signature: {
          dispatcher: {
            lastname: ILike(`%${search}%`),
          },
        },
      });

      where.push({ description: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: { signature: { authorizer: true, dispatcher: true, receiver: true } },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }
}
