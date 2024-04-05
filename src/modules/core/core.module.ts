import { TransactionDetailsController } from './controllers/transaction-details.controller';
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
import { TransactionsController } from './controllers/transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { TransactionDetailsService } from './services/transaction-datails.service';

@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [
    CataloguesController,
    LocationsController,
    CategoriesController,
    ProductsController,
    TransactionsController,
    TransactionDetailsController
  ],
  providers: [
    ...coreProviders,
    CataloguesService,
    LocationsService,
    CategoriesService,
    ProductsService,
    TransactionsService,
    TransactionDetailsService
  ],
  exports: [
    ...coreProviders,
    CataloguesService,
    LocationsService,
    CategoriesService,
    ProductsService,
    TransactionsService,
    TransactionDetailsService
  ],
})
export class CoreModule {

}
