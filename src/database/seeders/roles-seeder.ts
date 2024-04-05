import { Injectable } from '@nestjs/common';
import { RolesService } from '@auth/services';
import { CreateRoleDto } from '@auth/dto';
import { RoleEnum } from '@auth/enums';

@Injectable()
export class RolesSeeder {
  constructor(private rolesService: RolesService) {
  }

  async run() {
    await this.createRoles();
  }

  private async createRoles() {
    const roles: CreateRoleDto[] = [];
    roles.push(
      {
        code: RoleEnum.ADMIN,
        name: 'Administrador',
      },
      {
        code: RoleEnum.WORKER,
        name: 'Trabajador',
      },
      {
        code: RoleEnum.APPROVER,
        name: 'Aprobador',
      },
      {
        code: RoleEnum.PROVIDER,
        name: 'Proveedor',
      },
      {
        code: RoleEnum.CUSTOMER,
        name: 'Cliente',
      },
    );

    for (const role of roles) {
      await this.rolesService.create(role);
    }
  }
}
