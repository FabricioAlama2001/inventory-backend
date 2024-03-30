import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from '@database';


@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [],
  providers: [],
  exports: [],
})
export class ReportsModule {

}
