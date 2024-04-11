import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from '@database';
import { ReportsController } from './controllers';
import { ReportsService } from './services/reports.service';



@Global()
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [],
})
export class ReportsModule {

}
