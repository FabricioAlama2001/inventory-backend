import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { ResponseHttpModel } from "@shared/models";



@Controller('products')
export class ProductsController {
        constructor(private readonly productsService:ProductsService){

        }   

        @Post()
        async create(@Body()payload: any): Promise<ResponseHttpModel> {
            const data = await this.productsService.create(payload);

            return {
                data,
                message:'Registro creado',
                title:'',
            } 
        }

        @Put(':id')
        async update(@Param('id') id:string,@Body()payload: any): Promise<ResponseHttpModel> {
            const data = await this.productsService.update(id, payload);

            return {
                data,
                message:'Registro actualizado',
                title:'',
            } 
        }

        @Delete(':id')
        @HttpCode(HttpStatus.CREATED)
        async remove(@Param('id', ParseUUIDPipe) id: string) :Promise<ResponseHttpModel> {
        const data = await this.productsService.remove(id);

        return {
            data,
            message: `Product deleted ${id}`,
            title: `Deleted`,
        };
        }

        
        @Get('catalogues')
        @HttpCode(HttpStatus.OK)
        async findCatalogues() :Promise<ResponseHttpModel> {
            const response = await this.productsService.findCatalogues();
            
            return {
                data: response,
                message: `product`,
                title: `product`,
            };
        }
    
        
        @Get()
        @HttpCode(HttpStatus.OK)
        async findAll() :Promise<ResponseHttpModel> {
            const response = await this.productsService.findAll();
            
            return {
                data: response,
                message: `index`,
                title: ``,
            };
        }
    
        @Get(':id')
        @HttpCode(HttpStatus.OK)
        async findOne(@Param('id', ParseUUIDPipe) id: string) :Promise<ResponseHttpModel> {
            const data = await this.productsService.findOne(id);
            
            return {
                data,
                message: `show ${id}`,
                title: `Success`,
            };
        }


}