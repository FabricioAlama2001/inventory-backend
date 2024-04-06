import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ResponseHttpModel } from '@shared/models';
import { TransactionsService } from '../services/transactions.service';
import { Auth, User } from '@auth/decorators';
import { UserEntity } from '@auth/entities';


@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {

  }

  @Auth()
  @Post()
  async create(@User() user: UserEntity, @Body() payload: any): Promise<ResponseHttpModel> {
    const data = await this.transactionsService.create(user.id,payload);

    return {
      data,
      message: 'Registro creado',
      title: '',
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: any): Promise<ResponseHttpModel> {
    const data = await this.transactionsService.update(id, payload);

    return {
      data,
      message: 'Transacción actualizado',
      title: '',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.transactionsService.remove(id);

    return {
      data,
      message: `Transaction deleted ${id}`,
      title: `Deleted`,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseHttpModel> {
    const response = await this.transactionsService.findAll();

    return {
      data: response,
      message: `index`,
      title: ``,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const data = await this.transactionsService.findOne(id);

    return {
      data,
      message: `show ${id}`,
      title: `Success`,
    };
  }


}