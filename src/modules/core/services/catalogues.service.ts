import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import {
  CreateCatalogueDto,
  FilterCatalogueDto,
  PaginationDto,
  UpdateCatalogueDto,
} from '@core/dto';
import { CatalogueEntity } from '@core/entities';
import { RepositoryEnum } from '@shared/enums';
import { FilterUserDto, ReadUserDto } from '@auth/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { UserEntity } from '@auth/entities';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CataloguesService {
  constructor(
    @Inject(RepositoryEnum.CATALOGUE_REPOSITORY)
    private repository: Repository<CatalogueEntity>,
  ) {}

  async create(payload: CreateCatalogueDto) {
    const newCatalogue = this.repository.create(payload);

    return await this.repository.save(newCatalogue);
  }

  async catalogue() {
    const data = await this.repository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 1000 }, data: data[0] };
  }

  async findAll(params?: FilterCatalogueDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.repository.findAndCount();

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number) {
    const catalogue = await this.repository.findOne({
      where: { id },
    });

    if (!catalogue) {
      throw new NotFoundException('Catalogue not found');
    }

    return catalogue;
  }

  async update(id: number, payload: UpdateCatalogueDto) {
    const catalogue = await this.repository.findOneBy({ id });

    if (!catalogue) {
      throw new NotFoundException('Catalogue not found');
    }

    this.repository.merge(catalogue, payload);

    return this.repository.save(catalogue);
  }

  async remove(id: number) {
    const catalogue = await this.repository.findOneBy({ id });

    if (!catalogue) {
      throw new NotFoundException('Catalogue not found');
    }

    await this.repository.softDelete(id);
    return true;
  }

  async removeAll(payload: CatalogueEntity[]) {
    const usersDeleted = await this.repository.softRemove(payload);
    return { data: usersDeleted };
  }

  private async paginateAndFilter(params: FilterCatalogueDto) {
    let where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: plainToInstance(ReadUserDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
