import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AppRepository {
  private readonly userDb: Map<string, UserEntity> = new Map();

  public async getUser(userId: string): Promise<UserEntity | undefined> {
    return this.userDb.get(userId);
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return [...this.userDb.values()];
  }

  public async createUser(props: {
    login: string;
    password: string;
  }): Promise<UserEntity | undefined> {
    const { login, password } = props;

    const createdUser = new UserEntity(login, password);

    this.userDb.set(createdUser.id, createdUser);

    return this.getUser(createdUser.id);
  }

  public async updateUser(
    existUser: UserEntity,
    newPassword: string,
  ): Promise<void> {
    UserEntity.updateEntity(existUser, newPassword);
  }

  public async deleteUser(userId: string): Promise<void> {
    this.userDb.delete(userId);
  }
}
