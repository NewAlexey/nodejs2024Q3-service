import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {
  FrontUserEntityType,
  UserEntity,
} from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UserRepository } from 'src/db/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUser(userId: string): Promise<FrontUserEntityType> {
    const user: UserEntity | undefined = await this.userRepository.get(userId);

    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

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

    if (!user) {
      throw new HttpException(
        'User does not exist.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return UserEntity.removePassword(user);
  }

  public async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<FrontUserEntityType> {
    const existUser: UserEntity | undefined = await this.userRepository.get(
      userId,
    );

    if (!existUser) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    if (existUser.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong password.', HttpStatus.FORBIDDEN);
    }

    await this.userRepository.update(existUser, updateUserDto.newPassword);

    return this.getUser(userId);
  }

  public async deleteUser(userId: string): Promise<void> {
    const existUser: UserEntity | undefined = await this.userRepository.get(
      userId,
    );

    if (!existUser) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(userId);
  }
}
