import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {
  FrontUserEntityType,
  UserEntity,
} from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UserRepository } from 'src/db/user.repository';
import { assertIsDefined } from 'src/utils/assertIsDefined';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUser(userId: string): Promise<FrontUserEntityType> {
    const user: UserEntity | undefined = await this.userRepository.get(userId);

    assertIsDefined(
      user,
      HttpException,
      'User does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return UserEntity.removePassword(user);
  }

  public async getAllUsers(): Promise<FrontUserEntityType[]> {
    const userList = await this.userRepository.getAll();

    return userList.map((user) => UserEntity.removePassword(user));
  }

  public async createUser(
    createUserDto: CreateUserDto,
  ): Promise<FrontUserEntityType> {
    const user: UserEntity | undefined = await this.userRepository.create(
      createUserDto,
    );

    assertIsDefined(
      user,
      HttpException,
      'User does not exist.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    return UserEntity.removePassword(user);
  }

  public async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<FrontUserEntityType> {
    const user: UserEntity | undefined = await this.userRepository.get(userId);

    assertIsDefined(
      user,
      HttpException,
      'User does not exist.',
      HttpStatus.NOT_FOUND,
    );

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong password.', HttpStatus.FORBIDDEN);
    }

    await this.userRepository.update(user, updateUserDto.newPassword);

    return this.getUser(userId);
  }

  public async deleteUser(userId: string): Promise<void> {
    const user: UserEntity | undefined = await this.userRepository.get(userId);

    assertIsDefined(
      user,
      HttpException,
      'User does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.userRepository.delete(userId);
  }
}
