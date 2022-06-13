import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('')
  @HttpCode(HttpStatus.OK)
  index(@Query('name') name: string, @Query('lastname') lastname: string) {
    return {
      data: `${name} ${lastname}`,
      message: `index`,
    };
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  filter(@Query('search') search: string) {
    return {
      data: search,
      message: `filter`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  show(@Param('id') id: number) {
    return {
      data: id,
      message: `show`,
    };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  store(@Body() payload: any) {
    return {
      data: payload,
      message: `created`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      data: payload,
      message: `updated ${id}`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  destroy(@Param('id') id: number) {
    return {
      data: id,
      message: `deleted`,
    };
  }
}
