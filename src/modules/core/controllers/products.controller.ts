import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put, Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ResponseHttpModel } from '@shared/models';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {

  }

  @Post()
  async create(@Body() payload: any): Promise<ResponseHttpModel> {
    const data = await this.productsService.create(payload);

    return {
      data,
      message: 'Registro creado',
      title: '',
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: any): Promise<ResponseHttpModel> {
    const data = await this.productsService.update(id, payload);

    return {
      data,
      message: 'Registro actualizado',
      title: '',
    };
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseHttpModel> {
    const response = await this.productsService.findAll();

    return {
      data: response,
      message: `index`,
      title: ``,
    };
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findProducts(@Query() params: any): Promise<ResponseHttpModel> {
    const response = await this.productsService.findProducts(params);

    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
      title: ``,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.productsService.remove(id);

    return {
      data,
      message: `Product deleted ${id}`,
      title: `Deleted`,
    };
  }

  @Get('catalogues')
  @HttpCode(HttpStatus.OK)
  async findCatalogues(): Promise<ResponseHttpModel> {
    const response = await this.productsService.findCatalogues();

    return {
      data: response,
      message: `product`,
      title: `product`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.productsService.findOne(id);

    return {
      data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @Patch(':id/enable')
  @HttpCode(HttpStatus.CREATED)
  async enable(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.productsService.enable(id);

    return {
      data,
      message: `Registro habilitado`,
      title: `Habilitado`,
    };
  }

  @Patch(':id/disable')
  @HttpCode(HttpStatus.CREATED)
  async disable(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.productsService.disable(id);

    return {
      data,
      message: `Registro deshabilitado`,
      title: `Deshabilitado`,
    };
  }
}