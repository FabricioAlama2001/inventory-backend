import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { ResponseHttpModel } from "@shared/models";
import { SignaturesService } from "../services/signatures.service";
    


@Controller('signatures')
export class SignaturesController {
        constructor(private readonly signaturesService:SignaturesService){

        }   

        @Post()
        async create(@Body()payload: any): Promise<ResponseHttpModel> {
            const data = await this.signaturesService.create(payload);

            return {
                data,
                message:'Registro creado',
                title:'',
            } 
        }

        @Put(':id')
        async update(@Param('id') id:string,@Body()payload: any): Promise<ResponseHttpModel> {
            const data = await this.signaturesService.update(id, payload);

            return {
                data,
                message:'Registro actualizado',
                title:'',
            } 
        }

}