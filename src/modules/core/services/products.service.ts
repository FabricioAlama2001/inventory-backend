import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CoreRepositoryEnum } from '@shared/enums';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ServiceResponseHttpModel } from '@shared/models';
import { PaginationDto } from '@core/dto';

@Injectable()
export class ProductsService {
  constructor(@Inject(CoreRepositoryEnum.PRODUCT_REPOSITORY) private readonly repository: Repository<ProductEntity>) {
  }

  async create(payload: any): Promise<any> {
    const newEntity = this.repository.create();
    newEntity.code = payload.code;
    newEntity.costPrice = payload.costPrice;
    newEntity.description = payload.description;
    newEntity.minimumAmount = payload.minimumAmount;
    newEntity.name = payload.name;
    newEntity.sellingPrice = payload.sellingPrice;
    newEntity.categoryId = payload.category.id;
    newEntity.stock = payload.stock;
    newEntity.enabled = payload.enabled;

    return await this.repository.save(newEntity);
  }

  async update(id: string, payload: any): Promise<any> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    entity.code = payload.code;
    entity.costPrice = payload.costPrice;
    entity.description = payload.description;
    entity.minimumAmount = payload.minimumAmount;
    entity.name = payload.name;
    entity.sellingPrice = payload.sellingPrice;
    entity.categoryId = payload.category.id;
    entity.stock = payload.stock;
    entity.enabled = payload.enabled;

    return await this.repository.save(entity);
  }

  async findCatalogues(): Promise<ProductEntity[]> {
    const entities = await this.repository.find({ where: { enabled: true } });

    return entities;

  }

  async findOne(id: string): Promise<ProductEntity> {
    const entity = await this.repository.findOne({ relations: { category: true }, where: { id } });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    return entity;
  }

  async findAll(): Promise<ProductEntity[]> {
    const entities = await this.repository.find();

    return entities;

  }

  async remove(id: string): Promise<ProductEntity> {
    const data = await this.repository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException('Registro no encontrado');
    }

    return await this.repository.softRemove(data);
  }

  async enable(id: string): Promise<ProductEntity> {
    const data = await this.repository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException('Registro no encontrado');
    }

    data.enabled = true;

    return this.repository.save(data);
  }

  async disable(id: string): Promise<ProductEntity> {
    const data = await this.repository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException('Registro no encontrado');
    }

    data.enabled = false;

    return this.repository.save(data);
  }

  async findProducts(params?: any): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    return { data: [], pagination: null };
  }

  private async paginateAndFilter(params: any): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<ProductEntity> | FindOptionsWhere<ProductEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];

      where.push({ name: ILike(`%${search}%`) });
      where.push({ code: ILike(`%${search}%`) });
      where.push({ description: ILike(`%${search}%`) });
      where.push({ category: { name: ILike(`%${search}%`) } });
      where.push({ category: { code: ILike(`%${search}%`) } });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: { category: true },
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
