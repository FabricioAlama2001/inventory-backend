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
    Put,
    } from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {ResponseHttpModel} from '@shared/models';
import {CatalogueEntity} from '@core/entities';
import { CategoriesService } from '../services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: any) :Promise<ResponseHttpModel>{
        const data = await this.categoriesService.create(payload);

        return {
            data,
            message: 'Se creo correctamente',
            title: 'Registro creado'
        };
    }

    @ApiOperation({summary: 'List all catalogues'})
    @Get('catalogues')
    @HttpCode(HttpStatus.OK)
    async findCatalogues() :Promise<ResponseHttpModel> {
        const response = await this.categoriesService.findCatalogues();
        
        return {
            data: response,
            message: `catalogue`,
            title: `Catalogue`,
        };
    }

    @ApiOperation({summary: 'List of catalogues'})
    // @Roles(RoleEnum.ADMIN)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() :Promise<ResponseHttpModel> {
        const response = await this.categoriesService.findAll();
        
        return {
            data: response,
            message: `index`,
            title: ``,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseUUIDPipe) id: string) :Promise<ResponseHttpModel> {
        const data = await this.categoriesService.findOne(id);
        
        return {
            data,
            message: `show ${id}`,
            title: `Success`,
        };
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: any) :Promise<ResponseHttpModel> {
        const data = await this.categoriesService.update(id, payload);

        return {
            data: data,
            message: `Registro Actualizado`,
            title: `Actualización`,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseUUIDPipe) id: string) :Promise<ResponseHttpModel> {
        const data = await this.categoriesService.remove(id);

        return {
            data,
            message: `Registro Eliminado`,
            title: `Eliminación`,
        };
    }

    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: CatalogueEntity[]) :Promise<ResponseHttpModel> {
        const data = await this.categoriesService.removeAll(payload);

        return {
            data,
            message: `Catalogues deleted`,
            title: `Deleted`,
        };
    }

    @Patch(':id/enable')
    @HttpCode(HttpStatus.CREATED)
    async enable(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        const data = await this.categoriesService.enable(id);

        return {
            data,
            message: `Registro Habilitado`,
            title: `Habilitado`,
        };
    }

    @Patch(':id/disable')
    @HttpCode(HttpStatus.CREATED)
    async disable(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
        const data = await this.categoriesService.disable(id);

        return {
            data,
            message: `Registro Deshabilitado`,
            title: `Deshabilitado`,
        };
    }
}
