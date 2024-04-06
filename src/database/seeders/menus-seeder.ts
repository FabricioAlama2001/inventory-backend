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
        label: 'Administrador',
        order: 1,
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: RoleEnum.APPROVER,
        icon: PrimeIcons.LIST,
        isVisible: true,
        label: 'Aprobador',
        order: 1,
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: RoleEnum.PROVIDER,
        icon: PrimeIcons.LIST,
        isVisible: true,
        label: 'Proveedor',
        order: 1,
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: RoleEnum.CUSTOMER,
        icon: PrimeIcons.LIST,
        isVisible: true,
        label: 'Cliente',
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
        icon: 'pi pi-list',
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
    const worker = menusAll.find(menu => menu.code === RoleEnum.WORKER);

    menus = [];
    menus.push(
      {
        code: 'categories',
        icon: PrimeIcons.TAGS,
        isVisible: true,
        label: 'Categorías',
        order: 1,
        routerLink: '/core/worker/categories',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: worker,
      },
      {
        code: 'products',
        icon: PrimeIcons.SHOPPING_CART,
        isVisible: true,
        label: 'Productos',
        order: 2,
        routerLink: '/core/worker/products',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: worker,
      },
      {
        code: 'transactions',
        icon: PrimeIcons.SITEMAP,
        isVisible: true,
        label: 'Ingresos y Egresos',
        order: 3,
        routerLink: '/core/worker/transactions',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: worker,
      },
      {
        code: 'reports',
        icon: PrimeIcons.CHART_BAR,
        isVisible: true,
        label: 'Reportes',
        order: 4,
        routerLink: '/core/worker/reports',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: worker,
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
