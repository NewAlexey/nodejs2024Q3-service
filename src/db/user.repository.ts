import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly db: Map<string, UserEntity> = new Map();

  public async get(userId: string): Promise<UserEntity | undefined> {
    return this.db.get(userId);
  }

  public async getAll(): Promise<UserEntity[]> {
    return [...this.db.values()];
  }

  public async create(props: {
    login: string;
    password: string;
  }): Promise<UserEntity | undefined> {
    const { login, password } = props;

    const createdUser = new UserEntity(login, password);

    this.db.set(createdUser.id, createdUser);

    return this.get(createdUser.id);
  }

  public async update(
    existUser: UserEntity,
    newPassword: string,
  ): Promise<void> {
    existUser.password = newPassword;
    existUser.version += existUser.version;
    existUser.updatedAt = Date.now();
  }

  public async delete(userId: string): Promise<void> {
    this.db.delete(userId);
  }
}
