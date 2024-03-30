import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TransactionEntity } from "../entities/transaction.entity";
import { CoreRepositoryEnum } from "@shared/enums";
import { Repository } from "typeorm";

@Injectable()
export class TransactionsService{
    constructor(@Inject(CoreRepositoryEnum.TRANSACTION_REPOSITORY) private readonly repository: Repository<TransactionEntity>){   
    }

    
    async create(payload: any): Promise<any>{
        const newEntity = this.repository.create();
        newEntity.code=payload.code;
        newEntity.description=payload.description;
        newEntity.date=payload.date;
        newEntity.type=payload.type;

        
         return await this.repository.save(newEntity);
    } 

    async update(id:string,payload:any): Promise<any>{
        const entity = await this.repository.findOneBy({id});

        if(!entity){
            throw new NotFoundException('Registro no encontrado');
        }

        entity.code=payload.code;
        entity.description=payload.description;
        entity.date=payload.date;
        entity.type=payload.type;
             
         return await this.repository.save(entity);
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

    async remove(id: string): Promise<TransactionEntity> {
        const data = await this.repository.findOneBy({id});

        if (!data) {
            throw new NotFoundException('Registro no encontrado');
        }

        return await this.repository.softRemove(data);
    }

}