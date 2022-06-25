import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from '@core/dto';
import { StudentEntity } from '@core/entities';
// import { UsersService } from '@core/services';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>, // private userService: UsersService,
  ) {}

  async create(payload: CreateStudentDto) {
    const newStudent = this.studentRepository.create(payload);
    // newStudent.user = await this.userService.findOne(payload.userId);

    return await this.studentRepository.save(newStudent);
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
