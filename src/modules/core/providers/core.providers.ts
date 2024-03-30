import {DataSource} from 'typeorm';
import {
    CatalogueEntity,
    LocationEntity,
   
} from '@core/entities';
import {ConfigEnum, CoreRepositoryEnum} from '@shared/enums';

export const coreProviders = [
   
    {
        provide: CoreRepositoryEnum.CATALOGUE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CatalogueEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.LOCATION_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(LocationEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    
];
