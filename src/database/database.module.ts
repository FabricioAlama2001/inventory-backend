import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import {
  CataloguesSeeder,
  LocationsSeeder,
  MenusSeeder,
  RolesSeeder,
  UsersSeeder,
} from '@database/seeders';
import { DatabaseSeeder } from './seeders/database-seeder';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    CataloguesSeeder,
    UsersSeeder,
    RolesSeeder,
    MenusSeeder,
    LocationsSeeder,
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}
