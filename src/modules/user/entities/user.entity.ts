import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    description: 'User id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  public id: string;

  @ApiProperty({
    description: 'User login',
    example: 'Awesome Login',
  })
  public login: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
  })
  public password: string;

  @ApiProperty({
    description: 'User data version',
    example: '2',
  })
  public version: number;

  @ApiProperty({
    description: "User's creating timestamp.",
    example: 1731319909658,
  })
  public createdAt: number;

  @ApiProperty({
    description: "User's updating timestamp.",
    example: 1731319914193,
  })
  public updatedAt: number;

  constructor(login: string, password: string) {
    const timestamp = Date.now();

    this.login = login;
    this.password = password;
    this.id = v4();
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

export class FrontUserEntity {
  @ApiProperty({
    description: 'User id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  public id: string;

  @ApiProperty({
    description: 'User login',
    example: 'Awesome Login',
  })
  public login: string;

  @ApiProperty({
    description: 'User data version',
    example: '2',
  })
  public version: number;

  @ApiProperty({
    description: "User's creating timestamp.",
    example: 1731319909658,
  })
  public createdAt: number;

  @ApiProperty({
    description: "User's updating timestamp.",
    example: 1731319914193,
  })
  public updatedAt: number;
}
