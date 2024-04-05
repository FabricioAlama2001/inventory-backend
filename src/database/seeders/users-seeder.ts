import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CatalogueTypeEnum } from '@shared/enums';
import { SeedUserDto } from '@auth/dto';
import { RoleEntity } from '@auth/entities';
import { RoleEnum } from '@auth/enums';
import { RolesService, UsersService } from '@auth/services';
import { CatalogueEntity } from '@core/entities';
import { CataloguesService } from 'src/modules/core/services/catalogues.service';

@Injectable()
export class UsersSeeder {
  private identificationTypes: CatalogueEntity[] = [];
  private roles: RoleEntity[] = [];

  constructor(private rolesService: RolesService, private usersService: UsersService, private cataloguesService: CataloguesService) {}

  async run() {
    await this.loadRoles();
    await this.loadCatalogues();
    await this.createUsers();
  }

  async loadRoles() {
    this.roles = (await this.rolesService.findAll()).data as RoleEntity[];
  }

  async loadCatalogues() {
    const catalogues = (await this.cataloguesService.findAll()).data as CatalogueEntity[];

    this.identificationTypes = catalogues.filter(catalogue => catalogue.type === CatalogueTypeEnum.IDENTIFICATION_TYPE);
  }

  async createUsers() {
    const users: SeedUserDto[] = [];

    const adminRole = this.roles.find(role => role.code === RoleEnum.ADMIN);
    const workerRole = this.roles.find(role => role.code === RoleEnum.WORKER);
    const approverRole = this.roles.find(role => role.code === RoleEnum.APPROVER);
    const providerRole = this.roles.find(role => role.code === RoleEnum.PROVIDER);
    const customerRole = this.roles.find(role => role.code === RoleEnum.CUSTOMER);

    users.push(
      {
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        birthdate: faker.date.birthdate(),
        cellPhone: '',
        identification: 'user1',
        email: 'admin@correo.com',
        lastname: 'Perez',
        name: 'Admin',
        password: 'Sicnm24*',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        roles: [adminRole],
        username: 'admin',
      },
      {
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        birthdate: faker.date.birthdate(),
        cellPhone: '',
        identification: 'worker',

        email: 'worker@correo.com',
        lastname: 'Worker',
        name: 'Worker',
        password: 'Sicnm24*',
        passwordChanged: false,
        roles: [workerRole],
        personalEmail: faker.internet.email(),
        username: 'worker',
      },
      {
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        birthdate: faker.date.birthdate(),
        cellPhone: '',
        identification: 'approver',

        email: 'approver@correo.com',
        lastname: 'Aprobador',
        name: 'Aprobador',
        password: 'Sicnm24*',
        passwordChanged: false,
        roles: [approverRole],
        personalEmail: faker.internet.email(),
        username: 'approver',
      },
      {
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        birthdate: faker.date.birthdate(),
        cellPhone: '',
        identification: 'provider',
        email: 'provider@correo.com',
        lastname: 'Proveedor',
        name: 'Proveedor',
        password: 'Sicnm24*',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        roles: [providerRole],
        username: 'provider',
      },
      {
        identificationType:
          this.identificationTypes[
            faker.helpers.rangeToNumber({
              min: 0,
              max: this.identificationTypes.length - 1,
            })
          ],
        birthdate: faker.date.birthdate(),
        cellPhone: '',
        identification: 'customer',
        email: 'customer@correo.com',
        lastname: 'Cliente',
        name: 'Cliente',
        password: 'Sicnm24*',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        roles: [customerRole],
        username: 'customer',
      },
    );

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}
