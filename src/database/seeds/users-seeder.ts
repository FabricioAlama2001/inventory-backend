import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { SeedUserDto } from '@auth/dto';
import { RoleEntity } from '@auth/entities';
import { RoleEnum } from '@auth/enums';
import { RolesService, UsersService } from '@auth/services';
import { CatalogueEntity, InstitutionEntity } from '@core/entities';
import { CataloguesService, InstitutionsService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class UsersSeeder {
  private bloodTypes: CatalogueEntity[] = [];
  private ethnicOrigins: CatalogueEntity[] = [];
  private genders: CatalogueEntity[] = [];
  private identificationTypes: CatalogueEntity[] = [];
  private maritalStatus: CatalogueEntity[] = [];
  private sexes: CatalogueEntity[] = [];
  private roles: RoleEntity[] = [];
  private institutions: InstitutionEntity[] = [];

  constructor(
    private rolesService: RolesService,
    private usersService: UsersService,
    private cataloguesService: CataloguesService,
    private institutionsService: InstitutionsService,
  ) {}

  async run() {
    await this.loadRoles();
    await this.loadInstitutions();
    await this.loadCatalogues();
    await this.createUsers();
    await this.createStudentUsers();
    await this.createTeacherUsers();
  }

  private async loadRoles() {
    this.roles = (await this.rolesService.findAll()).data as RoleEntity[];
  }

  private async loadInstitutions() {
    this.institutions = (await this.institutionsService.findAll()).data;
  }

  private async loadCatalogues() {
    const catalogues = (await this.cataloguesService.findAll()).data as CatalogueEntity[];

    this.bloodTypes = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.BLOOD_TYPE);

    this.ethnicOrigins = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ETHNIC_ORIGIN);

    this.genders = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.GENDER);

    this.identificationTypes = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.IDENTIFICATION_TYPE);

    this.maritalStatus = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.MARITAL_STATUS);

    this.sexes = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.SEX);
  }

  private async createUsers() {
    const users: SeedUserDto[] = [];

    const adminRole = this.roles.find(role => role.code === RoleEnum.ADMIN);
    const coordinatorAdministrativeRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_ADMINISTRATIVE);
    const coordinatorCareerRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_CAREER);
    const rectorRole = this.roles.find(role => role.code === RoleEnum.RECTOR);

    const institution = this.institutions.find(institution => institution.code === 'cod1');

    users.push(
      {
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: 'admin@gmail.com',
        identification: '123456781',
        institutions: [],
        lastname: 'Perez',
        name: 'Admin',
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [adminRole],
        username: 'admin',
      },
      {
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: 'coordinator_administrative@gmail.com',
        identification: '123456782',
        institutions: [],
        lastname: 'Perez',
        name: 'Coordinator Administrative',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorAdministrativeRole],
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        username: 'coordinator_administrative',
      },
      {
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: 'coordinator_career@gmail.com',
        identification: '123456783',
        institutions: [institution],
        lastname: 'Perez',
        name: 'Coordinator Career',
        password: '12345678',
        passwordChanged: false,
        roles: [coordinatorCareerRole],
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        username: 'coordinator_career',
      },
      {
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: 'rector@gmail.com',
        identification: '123456784',
        institutions: [institution],
        lastname: 'Perez',
        name: 'Rector',
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [rectorRole],
        username: 'rector',
      },
    );

    for (const user of users) {
      await this.usersService.create(user);
    }
  }

  private async createStudentUsers() {
    const users: SeedUserDto[] = [];

    const studentRole = this.roles.find(role => role.code === RoleEnum.STUDENT);
    const institution = this.institutions.find(institution => institution.code === 'cod1');

    for (let i = 0; i < 10; i++) {
      const identification = faker.string.numeric(10);
      users.push({
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length)],
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
        identification: identification,
        institutions: [institution],
        lastname: faker.person.lastName(),
        name: faker.person.firstName(),
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [studentRole],
        username: identification,
      });
    }

    for (const user of users) {
      await this.usersService.create(user);
    }
  }

  private async createTeacherUsers() {
    const users: SeedUserDto[] = [];

    const teacherRole = this.roles.find(role => role.code === RoleEnum.TEACHER);
    const institution = this.institutions.find(institution => institution.code === 'cod1');

    for (let i = 0; i < 10; i++) {
      const identification = faker.string.numeric(10);
      users.push({
        bloodType: this.bloodTypes[Math.floor(Math.random() * this.bloodTypes.length)],
        ethnicOrigin: this.ethnicOrigins[Math.floor(Math.random() * this.ethnicOrigins.length)],
        gender: this.genders[Math.floor(Math.random() * this.genders.length)],
        identificationType: this.identificationTypes[Math.floor(Math.random() * this.identificationTypes.length)],
        maritalStatus: this.maritalStatus[Math.floor(Math.random() * this.maritalStatus.length)],
        sex: this.sexes[Math.floor(Math.random() * this.sexes.length * 1234562)],
        birthdate: faker.date.birthdate(),
        email: faker.internet.email(),
        identification: identification,
        institutions: [institution],
        lastname: faker.person.lastName(),
        name: faker.person.firstName(),
        password: '12345678',
        passwordChanged: false,
        personalEmail: faker.internet.email(),
        phone: faker.phone.number('09########'),
        roles: [teacherRole],
        username: identification,
      });
    }

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}
