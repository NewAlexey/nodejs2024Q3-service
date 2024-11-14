import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @ApiProperty({
    description: 'User id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'User login',
    example: 'Awesome Login',
  })
  @Column()
  public login: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
  })
  @Column()
  public password: string;

  @ApiProperty({
    description: 'User data version',
    example: '2',
  })
  @Column({ default: 1 })
  public version: number;

  @BeforeUpdate()
  public updateHandler(): void {
    this.version += 1;
    this.updatedAt = Date.now();
  }

  @BeforeInsert()
  public insertHandler(): void {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  @ApiProperty({
    description: "User's creating timestamp.",
    example: 1731319909658,
  })
  @Column({
    type: 'bigint',
    transformer: {
      from: (value: string) => Number(value),
      to: (value) => value,
    },
  })
  public createdAt: number;

  @ApiProperty({
    description: "User's updating timestamp.",
    example: 1731319914193,
  })
  @Column({
    type: 'bigint',
    transformer: {
      from: (value: string) => Number(value),
      to: (value) => value,
    },
  })
  public updatedAt: number;

  static removePassword(
    userEntity: UserEntity,
  ): Omit<UserEntity, 'password' | 'insertHandler' | 'updateHandler'> {
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
