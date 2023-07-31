import { Injectable } from '@nestjs/common';
import { StudentsService, TeachersService } from '@core/services';
import * as XLSX from 'xlsx';
import * as process from 'process';
import { join } from 'path';
import { RolesService, UsersService } from '@auth/services';
import { RoleEnum } from '@auth/enums';
import { RoleEntity } from '@auth/entities';

@Injectable()
export class ExportsService {
  constructor(
    private usersService: UsersService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private rolesService: RolesService,
  ) {}

  async exportStudents(): Promise<string> {
    let users = (await this.usersService.findAll()).data;
    const newWorkbook = XLSX.utils.book_new();
    users = users.map((user) => {
      return {
        'Matrículas asd': user.id,
      };
    });

    const newSheet = XLSX.utils.json_to_sheet(users);

    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Estudiantes');
    const path = join(
      process.cwd(),
      'src/resources/exports',
      Date.now() + '.xlsx',
    ); //review path
    XLSX.writeFile(newWorkbook, path);
    console.log(path);
    return path;
  }
}