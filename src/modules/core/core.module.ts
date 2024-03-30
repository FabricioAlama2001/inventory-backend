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

@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [

    CataloguesController,
    LocationsController,
  ],
  providers: [
    ...coreProviders,
    CataloguesService,
    LocationsService,
  ],
  exports: [
    ...coreProviders,
    CataloguesService,
    LocationsService,
  ],
})
export class CoreModule {

}
