import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from '@core/dto';
import { CataloguesService, InstitutionsService } from '@core/services';
import { CatalogueTypeEnum } from '@shared/enums';
import { CatalogueEntity } from '@core/entities';
import { faker } from '@faker-js/faker';

@Injectable()
export class InstitutionsSeeder {
  constructor(private institutionsService: InstitutionsService, private cataloguesService: CataloguesService) {}

  async run() {
    await this.create();
  }

  private async create() {
    const institutions: CreateInstitutionDto[] = [];
    const catalogues = await this.cataloguesService.findCache();

    const stateEnable = catalogues.find((state: CatalogueEntity) => {
      return state.code === 'enabled' && state.type === CatalogueTypeEnum.INSTITUTIONS_STATE;
    });

    institutions.push(
      {
        state: stateEnable,
        acronym: 'UAW',
        cellphone: faker.phone.number(),
        code: '1068',
        codeSniese: '1068',
        denomination: 'UNIVERSIDAD INTERCULTURAL',
        email: 'instituto@edu.ec.com',
        isVisible: true,
        logo: 'img1',
        name: 'UNIVERSIDAD INTERCULTURAL DE LAS NACIONALIDADES Y PUEBLOS INDIGENAS AMAWTAY WASI',
        phone: '2245666',
        shortName: 'AMAWTAY WASI',
        slogan: '',
        web: faker.internet.url(),
      },
    );

    for (const item of institutions) {
      await this.institutionsService.create(item);
    }
  }
}
