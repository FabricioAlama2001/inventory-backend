import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import {
  CataloguesController,
  LocationsController,
} from '@core/controllers';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';
import { LocationsService } from './services/locations.service';
import { CataloguesService } from './services/catalogues.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ExpensesController } from './controllers/expenses.controller';
import { IncomesController } from './controllers/incomes.controller';
import { IncomesService } from './services/incomes.service';
import { TransactionInDetailsService } from './services/transaction-in-datails.service';
import { TransactionOutDetailsService } from './services/transaction-out-datails.service';
import { SignaturesService } from './services/signatures.service';
import { ExpensesService } from './services/expenses.service';

@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [
    CataloguesController,
    LocationsController,
    CategoriesController,
    ProductsController,
    ExpensesController,
    IncomesController,
  ],
  providers: [
    ...coreProviders,
    CataloguesService,
    LocationsService,
    CategoriesService,
    ProductsService,
    ExpensesService,
    IncomesService,
    TransactionInDetailsService,
    TransactionOutDetailsService,
    SignaturesService,
  ],
  exports: [
    ...coreProviders,
    CataloguesService,
    LocationsService,
    CategoriesService,
    ProductsService,
    SignaturesService,
  ],
})
export class CoreModule {

}
