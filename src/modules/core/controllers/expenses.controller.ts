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
import { ExpensesService } from '../services/expenses.service';
import { Auth, User } from '@auth/decorators';
import { UserEntity } from '@auth/entities';


@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {

  }

  @Auth()
  @Post()
  async create(@User() user: UserEntity, @Body() payload: any): Promise<ResponseHttpModel> {
    const data = await this.expensesService.create(user.id, payload);

    return {
      data,
      message: 'Registro creado',
      title: '',
    };
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: any): Promise<ResponseHttpModel> {
    const data = await this.expensesService.update(id, payload);

    return {
      data,
      message: 'Transacción actualizado',
      title: '',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.expensesService.remove(id);

    return {
      data,
      message: `Transaction deleted ${id}`,
      title: `Deleted`,
    };
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseHttpModel> {
    const response = await this.expensesService.findAll();

    return {
      data: response,
      message: `index`,
      title: ``,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.expensesService.findOne(id);

    return {
      data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findExpenses(@Query() params: any): Promise<ResponseHttpModel> {
    const response = await this.expensesService.findExpenses(params);

    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
      title: ``,
    };
  }
}