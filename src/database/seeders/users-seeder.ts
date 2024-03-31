import {Injectable} from '@nestjs/common';
import {faker} from '@faker-js/faker';
import {CatalogueTypeEnum} from '@shared/enums';
import {SeedUserDto} from '@auth/dto';
import {RoleEntity} from '@auth/entities';
import {RoleEnum} from '@auth/enums';
import {RolesService, UsersService} from '@auth/services';
import { CatalogueEntity} from '@core/entities';
import * as XLSX from "xlsx";
import {join} from "path";
import { CataloguesService } from 'src/modules/core/services/catalogues.service';

@Injectable()
export class UsersSeeder {
    private identificationTypes: CatalogueEntity[] = [];
    private roles: RoleEntity[] = [];
    
    constructor(
        private rolesService: RolesService,
        private usersService: UsersService,
        private cataloguesService: CataloguesService,
    
    ) {
    }

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
        const coordinatorAdministrativeRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_ADMINISTRATIVE);
        const coordinatorCareerRole = this.roles.find(role => role.code === RoleEnum.COORDINATOR_CAREER);
        const rectorRole = this.roles.find(role => role.code === RoleEnum.RECTOR);
        const reviewerRole = this.roles.find(role => role.code === RoleEnum.REVIEWER);
        const secretaryRole = this.roles.find(role => role.code === RoleEnum.SECRETARY);
        const welfareRole = this.roles.find(role => role.code === RoleEnum.WELFARE);
        const workerRole = this.roles.find(role => role.code === RoleEnum.WORKER);

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
                identification: 'user8',
   
                email: 'worker@correo.com',
                lastname: 'Administrative',
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
                identification: 'user3',
   
                email: 'coordinator_career@correo.com',
                lastname: 'Career',
                name: 'Coordinator',
                password: 'Siaaw23*',
                passwordChanged: false,
                roles: [coordinatorCareerRole],
                personalEmail: faker.internet.email(),
                username: 'coordinator_career',
   
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
                identification: 'user4',
                email: 'rector@correo.com',
                lastname: 'Perez',
                name: 'Rector',
                password: 'Siaaw23*',
                passwordChanged: false,
                personalEmail: faker.internet.email(),
                roles: [rectorRole],
                username: 'rector',
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
                identification: 'user5',
                email: 'reviewer@correo.com',
                lastname: 'Perez',
                name: 'Reviewer',
                password: 'Siaaw23*',
                passwordChanged: false,
                personalEmail: faker.internet.email(),
                roles: [reviewerRole],
                username: 'reviewer',
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
                identification: 'user6',
                email: 'secretary@correo.com',
                lastname: 'Perez',
                name: 'Secretary',
                password: 'Siaaw23*',
                passwordChanged: false,
                personalEmail: faker.internet.email(),
                roles: [secretaryRole],
                username: 'secretary',
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
                identification: 'user7',
                email: 'welfare@correo.com',
                lastname: 'Estudiantil',
                name: 'Bienestar',
                password: 'Siaaw23*',
                passwordChanged: false,
                personalEmail: faker.internet.email(),
                roles: [welfareRole],
                username: 'welfare',
            }
        );

        for (const user of users) {
            await this.usersService.create(user);
        }
    }


    
}
