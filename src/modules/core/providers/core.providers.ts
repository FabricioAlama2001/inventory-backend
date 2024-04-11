import {DataSource} from 'typeorm';
import {
    CatalogueEntity,
    CategoryEntity,
    ExpenseEntity,
    IncomeEntity,
    LocationEntity,
    ProductEntity,
    SignatureEntity,
    TransactionInDetailEntity,
    TransactionOutDetailEntity,
   
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
        provide: CoreRepositoryEnum.INCOME_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(IncomeEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.EXPENSE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ExpenseEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.TRANSACTION_IN_DETAIL_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TransactionInDetailEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
    {
        provide: CoreRepositoryEnum.TRANSACTION_OUT_DETAIL_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TransactionOutDetailEntity),
        inject: [ConfigEnum.PG_DATA_SOURCE],
    },
];
