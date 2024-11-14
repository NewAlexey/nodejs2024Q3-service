import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  FrontUserEntity,
  UserEntity,
} from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { assertIsDefined } from 'src/utils/assertIsDefined';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getUser(id: string): Promise<FrontUserEntity> {
    const user: UserEntity | undefined = await this.userRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      user,
      HttpException,
      'User does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return UserEntity.removePassword(user);
  }

  public async getAllUsers(): Promise<FrontUserEntity[]> {
    const userList = await this.userRepository.find();

    return userList.map((user) => UserEntity.removePassword(user));
  }

  public async createUser(
    createUserDto: CreateUserDto,
  ): Promise<FrontUserEntity> {
    const user: UserEntity | undefined =
      this.userRepository.create(createUserDto);

    assertIsDefined(
      user,
      HttpException,
      'User does not exist.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    await this.userRepository.insert(user);

    return this.getUser(user.id);
  }

  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<FrontUserEntity> {
    const user: UserEntity | undefined = await this.userRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      user,
      HttpException,
      'User does not exist.',
      HttpStatus.NOT_FOUND,
    );

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong password.', HttpStatus.FORBIDDEN);
    }

    user.password = updateUserDto.newPassword;

    await this.userRepository.update(id, user);

    return this.getUser(id);
  }

  public async deleteUser(id: string): Promise<void> {
    const user: UserEntity | undefined = await this.userRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      user,
      HttpException,
      'User does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.userRepository.delete(id);
  }
}
