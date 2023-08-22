import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateTeacherDistributionDto, UpdateTeacherDistributionDto, FilterTeacherDistributionDto } from '@core/dto';
import { TeacherDistributionsService } from '@core/services';
import { TeacherDistributionEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Teacher Distribution')
@Controller('teacher-distributions')
export class TeacherDistributionsController {
  constructor(private teacherDistributionsService: TeacherDistributionsService) {}

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributionsService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catálogo`,
      title: `Catálogo`,
    };
  }

  @ApiOperation({ summary: 'Create' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateTeacherDistributionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributionsService.create(payload);

    return {
      data: serviceResponse,
      message: 'fue creada',
      title: 'creada',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterTeacherDistributionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributionsService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Buscar todas las ',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributionsService.findOne(id);

    return {
      data: serviceResponse,
      message: `Buscar`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateTeacherDistributionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributionsService.update(id, payload);
    return {
      data: serviceResponse,
      message: `fue actualizada`,
      title: `actualizada`,
    };
  }

  @ApiOperation({ summary: 'Delete' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributionsService.remove(id);
    return {
      data: serviceResponse,
      message: `fue eliminada`,
      title: `eliminada`,
    };
  }

  @ApiOperation({ summary: 'Delete All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: TeacherDistributionEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributionsService.removeAll(payload);

    return {
      data: serviceResponse,
      message: `fueron eliminadas`,
      title: `eliminadas`,
    };
  }
}