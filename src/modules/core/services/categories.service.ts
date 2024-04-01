import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {CategoryEntity} from '@core/entities';
import {CoreRepositoryEnum} from '@shared/enums';

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

    async enable(id: string) {
        const data = await this.repository.findOneBy({ id });

        if (!data) {
            throw new NotFoundException('Registro no encontrado');
        }

        data.enabled = true;

        return this.repository.save(data);
    }

    async disable(id: string) {
        const data = await this.repository.findOneBy({ id });

        if (!data) {
            throw new NotFoundException('Registro no encontrado');
        }

        data.enabled = false;

        return this.repository.save(data);
    }
}
