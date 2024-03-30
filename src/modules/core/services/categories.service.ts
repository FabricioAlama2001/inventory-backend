import {CACHE_MANAGER, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {FindOptionsWhere, ILike, Repository} from 'typeorm';
import {CreateCatalogueDto, FilterCatalogueDto, PaginationDto, UpdateCatalogueDto} from '@core/dto';
import {CatalogueEntity, CategoryEntity} from '@core/entities';
import {CacheEnum, CatalogueTypeEnum, CoreRepositoryEnum} from '@shared/enums';
import {ReadUserDto} from '@auth/dto';
import {UserEntity} from '@auth/entities';
import {plainToInstance} from 'class-transformer';
import {ServiceResponseHttpModel} from '@shared/models';


@Injectable()
export class CategoriesService {
   
    constructor(@Inject(CoreRepositoryEnum.CATEGORY_REPOSITORY) private readonly repository: Repository<CategoryEntity>,) {    
    }

    async create(payload: any): Promise<any> {
        const newEntity = this.repository.create(payload);

        return await this.repository.save(newEntity);
    }

    async findCatalogues(): Promise<CategoryEntity[]> {
        const data = await this.repository.find({
            where: {enabled: true}
        });

        return data;
    }

    async findAll(): Promise<CategoryEntity[]> {
        const data = await this.repository.find();
        return data;
    }

    async findOne(id: string) {
        const data = await this.repository.findOne({
            where: {id},
        });

        if (!data) {
            throw new NotFoundException('Registro no encontrado');
        }

        return data;
    }

    async update(id: string, payload: any) {
        const data = await this.repository.findOneBy({id});

        if (!data) {
            throw new NotFoundException('Registro no encontrado');
        }

        this.repository.merge(data, payload);

        return this.repository.save(data);
    }

    async remove(id: string): Promise<CategoryEntity> {
        const data = await this.repository.findOneBy({id});

        if (!data) {
            throw new NotFoundException('Registro no encontrado');
        }

        return await this.repository.softRemove(data);
    }

    async removeAll(payload: any[]): Promise<CategoryEntity[]> {
        return await this.repository.softRemove(payload);
    }
}
