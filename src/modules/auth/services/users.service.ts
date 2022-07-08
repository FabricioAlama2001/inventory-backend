import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '@auth/dto';
import { UserEntity } from '@auth/entities';
import { CataloguesService } from '@core/services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private catalogueService: CataloguesService,
  ) {}

  async create(payload: CreateUserDto) {
    const newUser = this.userRepository.create(payload);
    newUser.bloodType = await this.catalogueService.findOne(
      payload.bloodType.id,
    );
    const response = await this.userRepository.save(newUser);
    return await this.userRepository.save(response);
  }

  async findAll() {
    return this.userRepository.find({ relations: ['bloodType', 'gender'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['bloodType', 'gender'],
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userRepository.merge(user, data);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.softDelete(id);
    return true;
  }
}
