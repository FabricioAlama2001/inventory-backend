import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ResponseHttpModel } from '@shared/models';
import { IncomesService } from '../services/incomes.service';
import { Auth, User } from '@auth/decorators';
import { UserEntity } from '@auth/entities';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {

  }

  @Auth()
  @Post()
  async create(@User() user: UserEntity, @Body() payload: any): Promise<ResponseHttpModel> {
    const data = await this.incomesService.create(user.id,payload);

    return {
      data,
      message: 'Registro creado',
      title: '',
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: any): Promise<ResponseHttpModel> {
    const data = await this.incomesService.update(id, payload);

    return {
      data,
      message: 'Transacción actualizado',
      title: '',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.incomesService.remove(id);

    return {
      data,
      message: `Transaction deleted ${id}`,
      title: `Deleted`,
    };
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseHttpModel> {
    const response = await this.incomesService.findAll();

    return {
      data: response,
      message: `index`,
      title: ``,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.incomesService.findOne(id);

    return {
      data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findIncomes(@Query() params: any): Promise<ResponseHttpModel> {
    const response = await this.incomesService.findIncomes(params);

    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
      title: ``,
    };
  }
}
