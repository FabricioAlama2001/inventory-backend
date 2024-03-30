import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CoreRepositoryEnum } from "@shared/enums";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(@Inject(CoreRepositoryEnum.PRODUCT_REPOSITORY) private readonly repository: Repository<ProductEntity>){   
    }

    async create(payload: any): Promise<any>{
        const newEntity = this.repository.create();
        newEntity.code=payload.code;
        newEntity.costPrice=payload.costPrice;
        newEntity.description=payload.description;
        newEntity.minimumAmount=payload.minimumAmount;
        newEntity.name=payload.name;
        newEntity.sellingPrice=payload.sellingPrice;
        
         return await this.repository.save(newEntity);
    } 

    async update(id:string,payload:any): Promise<any>{
        const entity = await this.repository.findOneBy({id});

        if(!entity){
            throw new NotFoundException('Registro no encontrado');
        }

        entity.code=payload.code;
        entity.costPrice=payload.costPrice;
        entity.description=payload.description;
        entity.minimumAmount=payload.minimumAmount;
        entity.name=payload.name;
        entity.sellingPrice=payload.sellingPrice;
        
         return await this.repository.save(entity);
    }

    async findCatalogues(): Promise<any>{
        const entities = await this.repository.find({where:{enabled:true}});

       return entities;
        
    }

       async findOne(id:string): Promise<any>{
        const entity = await this.repository.findOne({where:{id}});

        if(!entity){
            throw new NotFoundException('Registro no encontrado');
        }

         return entity;
    }   

    async findAll(): Promise<any>{
        const entities = await this.repository.find();

       return entities;
        
    }

    async remove(id: string): Promise<ProductEntity> {
        const data = await this.repository.findOneBy({id});

        if (!data) {
            throw new NotFoundException('Registro no encontrado');
        }

        return await this.repository.softRemove(data);
    }

    
}