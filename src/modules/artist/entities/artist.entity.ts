import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity {
  @ApiProperty({
    description: 'Artist id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  public id: string;

  @ApiProperty({
    description: 'Artist name',
    example: 'System of a down',
  })
  public name: string;

  @ApiProperty({
    description: '"Is artist gets grammy?" value',
    example: true,
  })
  public grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = v4();
    this.name = name;
    this.grammy = grammy;
  }
}
