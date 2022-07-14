import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '@auth/dto';
import { UserEntity } from '@auth/entities';
import { PaginationDto } from '@core/dto';
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

    const userCreated = await this.userRepository.save(newUser);

    return await this.userRepository.save(userCreated);
  }

  async catalogue() {
    const response = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      take: 1000,
    });

    return {
      pagination: { totalItems: response[1], limit: 10 },
      data: response[0],
    };
  }

  async findAll(params?: FilterUserDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.birthdate) {
      return this.filterByBirthdate(params.birthdate);
    }

    //All
    const data = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['bloodType', 'gender'],
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userRepository.merge(user, payload);

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.softRemove(user);
  }

  async removeAll(payload: UserEntity[]) {
    return { data: await this.userRepository.softRemove(payload) };
  }

  private async paginateAndFilter(params: FilterUserDto) {
    let where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ lastname: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ username: ILike(`%${search}%`) });
    }

    const response = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByBirthdate(birthdate: Date) {
    const where: FindOptionsWhere<UserEntity> = {};

    if (birthdate) {
      where.birthdate = LessThan(birthdate);
    }

    const response = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
