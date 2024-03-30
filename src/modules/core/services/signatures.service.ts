import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CoreRepositoryEnum } from "@shared/enums";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { SignatureEntity } from "../entities/signature.entity";

@Injectable()
export class SignaturesService {
    constructor(@Inject(CoreRepositoryEnum.PRODUCT_REPOSITORY) private readonly repository: Repository<SignatureEntity>){   
    }

    async create(payload: any): Promise<any>{
        const newEntity = this.repository.create();
        newEntity.authorizerId= payload.authorizerId;
        newEntity.dispatcherId= payload.dispatcherId;
        newEntity.receiverId= payload.receiverId;
        newEntity.transactionId= payload.transactionId;
         return await this.repository.save(newEntity);
    } 

    async update(id:string,payload:any): Promise<any>{
        const entity = await this.repository.findOneBy({id});

        if(!entity){
            throw new NotFoundException('Registro no encontrado');
        }

        entity.authorizerId= payload.authorizerId;
        entity.dispatcherId= payload.dispatcherId;
        entity.receiverId= payload.receiverId;
        entity.transactionId= payload.transactionId;
        return await this.repository.save(entity);
    }
    
}