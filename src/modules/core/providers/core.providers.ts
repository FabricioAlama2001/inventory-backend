import {DataSource} from 'typeorm';
import {
    CatalogueEntity,
    CategoryEntity,
    LocationEntity,
    ProductEntity,
    SignatureEntity,
    TransactionDetailEntity,
    TransactionEntity,
   
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
    {
        provide: CoreRepositoryEnum.CATEGORY_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CategoryEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.PRODUCT_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.SIGNATURE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SignatureEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.TRANSACTION_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TransactionEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.TRANSACTION_DETAIL_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TransactionDetailEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },

];
