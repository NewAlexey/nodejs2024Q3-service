import { randomUUID } from 'crypto';

export class UserEntity {
  public id: string;
  public login: string;
  public password: string;
  public version: number;
  public createdAt: number;
  public updatedAt: number;

  constructor(login: string, password: string) {
    const timestamp = Date.now();

    this.login = login;
    this.password = password;
    this.id = randomUUID();
    this.version = 1;
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  static removePassword(userEntity: UserEntity): Omit<UserEntity, 'password'> {
    const copiedUserEntity = { ...userEntity };

    delete copiedUserEntity.password;

    return copiedUserEntity;
  }
}

export type FrontUserEntityType = Omit<UserEntity, 'password'>;
