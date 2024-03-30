import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ResponseHttpModel } from "@shared/models";
import { TransactionsService } from "../services/transactions.service";


@Controller('transactions')
export class TransactionsController {
        constructor(private readonly transactionsService:TransactionsService){

        }   

        @Post()
        async create(@Body()payload: any): Promise<ResponseHttpModel> {
            const data = await this.transactionsService.create(payload);

            return {
                data,
                message:'Registro creado',
                title:'',
            } 
        }

        @Put(':id')
        async update(@Param('id') id:string,@Body()payload: any): Promise<ResponseHttpModel> {
            const data = await this.transactionsService.update(id, payload);

            return {
                data,
                message:'Transacción actualizado',
                title:'',
            } 
        }

        @Delete(':id')
        @HttpCode(HttpStatus.CREATED)
        async remove(@Param('id', ParseUUIDPipe) id: string) :Promise<ResponseHttpModel> {
        const data = await this.transactionsService.remove(id);

        return {
            data,
            message: `Transaction deleted ${id}`,
            title: `Deleted`,
        };
        }
                      
        @Get()
        @HttpCode(HttpStatus.OK)
        async findAll() :Promise<ResponseHttpModel> {
            const response = await this.transactionsService.findAll();
            
            return {
                data: response,
                message: `index`,
                title: ``,
            };
        }
    
        @Get(':id')
        @HttpCode(HttpStatus.OK)
        async findOne(@Param('id', ParseUUIDPipe) id: string) :Promise<ResponseHttpModel> {
            const data = await this.transactionsService.findOne(id);
            
            return {
                data,
                message: `show ${id}`,
                title: `Success`,
            };
        }


}