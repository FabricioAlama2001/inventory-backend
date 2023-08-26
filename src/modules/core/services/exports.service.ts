import { Injectable } from '@nestjs/common';
import { StudentsService, TeachersService } from '@core/services';
import * as XLSX from 'xlsx';
import * as process from 'process';
import { join } from 'path';
import { RolesService, UsersService } from '@auth/services';
import { GradesService } from './grades.service';

@Injectable()
export class ExportsService {
  constructor(
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private rolesService: RolesService,
    private gradeService: GradesService,
    private usersService: UsersService,
  ) {}

  async exportStudents(): Promise<string> {
    let users = (await this.usersService.findAll()).data;
    const newWorkbook = XLSX.utils.book_new();
    users = users.map(user => {
      return {
        'Matrículas asd': user.id,
      };
    });

    const newSheet = XLSX.utils.json_to_sheet(users);

    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Estudiantes');
    const path = join(process.cwd(), 'src/resources/exports', Date.now() + '.xlsx'); //review path
    XLSX.writeFile(newWorkbook, path);
    return path;
  }

  async exportNotes(): Promise<string> {
    let notes = (await this.gradeService.findAll()).data;
    const newWorkbook = XLSX.utils.book_new();
    notes = notes.map(notes => {
      return {
        'codigo asignatura': notes.enrollmentDetail.subject.code,
        'nombre asignatura': notes.enrollmentDetail.subject.name,
        'malla curricular': notes.enrollmentDetail.subject.curriculum.name,
        estudiante: notes.enrollmentDetail.enrollment.student.user.name + notes.enrollmentDetail.enrollment.student.user.lastname,
        cedula: notes.enrollmentDetail.enrollment.student.user.identification,
        nota1: notes.value,
        nota2: notes.value,
        'nota final': notes.enrollmentDetail.finalGrade,
        'estado academico': notes.enrollmentDetail.academicState.name,
      };
    });

    const newSheet = XLSX.utils.json_to_sheet(notes);

    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Notas');
    const path = join(process.cwd(), 'src/resources/exports', Date.now() + '.xlsx'); //review path
    XLSX.writeFile(newWorkbook, path);
    return path;
  }
}
