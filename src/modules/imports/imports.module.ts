import {Global, Module} from '@nestjs/common';
import {DatabaseModule} from '@database';


@Global()
@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class ImportsModule {

}
