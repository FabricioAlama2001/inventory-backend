import { Injectable } from '@nestjs/common';
import { MenusService, RolesService } from '@auth/services';
import { CreateMenuDto } from '@auth/dto';
import { MenuTypeEnum, RoleEnum } from '@auth/enums';
import { MenuEntity } from '@auth/entities';
import { PrimeIcons } from '../../shared/enums/prime-icons.enum';

@Injectable()
export class MenusSeeder {
  constructor(private menusService: MenusService, private rolesService: RolesService) {
  }

  async run() {
    await this.createMenus();
    await this.createMenuRole();
  }

  private async createMenus() {
    let menus: CreateMenuDto[] = [];
    menus.push(
      {
        code: RoleEnum.ADMIN,
        icon: PrimeIcons.USER,
        isVisible: true,
        label: 'Administrador',
        order: 1,
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: RoleEnum.WORKER,
        icon: PrimeIcons.LIST,
        isVisible: true,
        label: 'Docentes',
        order: 1,
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: RoleEnum.APPROVER,
        icon: PrimeIcons.LIST,
        isVisible: true,
        label: 'Estudiantes',
        order: 1,
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: RoleEnum.PROVIDER,
        icon: PrimeIcons.LIST,
        isVisible: true,
        label: 'Coordinador Administrativo',
        order: 1,
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: RoleEnum.CUSTOMER,
        icon: PrimeIcons.LIST,
        isVisible: true,
        label: 'Coordinador de Carrera',
        order: 1,
        type: MenuTypeEnum.LEFT_SIDE,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }

    const menusAll = (await this.menusService.findAll()).data as MenuEntity[];

    /** Admin Role **/
    const adminMenu = menusAll.find(menu => menu.code === RoleEnum.ADMIN);

    menus = [];
    menus.push(
      {
        code: 'users',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Usuarios',
        order: 1,
        routerLink: '/admin/users',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: adminMenu,
      },
      {
        code: 'menus',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Menus',
        order: 2,
        routerLink: '/admin/menus',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: adminMenu,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }

    /** Coordinator Career Role **/
    const coordinatorCareer = menusAll.find(menu => menu.code === RoleEnum.WORKER);

    menus = [];
    menus.push(
      {
        code: 'institutions',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Instituciones',
        order: 1,
        routerLink: '/core/coordinator-career/institutions',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: coordinatorCareer,
      },
      {
        code: 'careers',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Carreras',
        order: 2,
        routerLink: '/core/coordinator-career/careers',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: coordinatorCareer,
      },
      {
        code: 'curriculums',
        icon: 'pi pi-list',
        isVisible: true,
        label: 'Mallas Curriculares',
        order: 3,
        routerLink: '/core/coordinator-career/curriculums',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: coordinatorCareer,
      },
      {
        code: 'subjects',
        icon: 'pi pi-book',
        isVisible: true,
        label: 'Asignaturas',
        order: 4,
        routerLink: '/core/coordinator-career/subjects',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: coordinatorCareer,
      },
      {
        code: 'teachers',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Admin Docentes',
        order: 5,
        routerLink: '/core/coordinator-career/teachers',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: coordinatorCareer,
      },
      {
        code: 'school-periods',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Periodos Lectivos',
        order: 6,
        routerLink: '/core/coordinator-career/school-periods',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: coordinatorCareer,
      },
      {
        code: 'consolidated-grades',
        icon: 'pi pi-bars',
        isVisible: false,
        label: 'Consolidado de notas',
        order: 7,
        routerLink: '/core/coordinator-career/consolidated-notes',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: coordinatorCareer,
      },
      {
        code: 'teacher-distributions',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Distributivo Docente',
        order: 8,
        routerLink: '/core/coordinator-career/teacher-distributions',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: coordinatorCareer,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }
  }

  private async createMenuRole() {
    const menusAll = (await this.menusService.findAll()).data;

    let role = await this.rolesService.findByCode(RoleEnum.ADMIN);
    role.menus = menusAll.filter(menu => menu.code === RoleEnum.ADMIN);
    await this.rolesService.createMenus(role);

    role = await this.rolesService.findByCode(RoleEnum.WORKER);
    role.menus = menusAll.filter(menu => menu.code === RoleEnum.WORKER);
    await this.rolesService.createMenus(role);
  }
}
