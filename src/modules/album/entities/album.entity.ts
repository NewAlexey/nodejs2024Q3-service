import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty({
    description: 'Album id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  public id: string;

  @ApiProperty({
    description: 'Album name',
    example: 'Toxicity',
  })
  public name: string;

  @ApiProperty({
    description: 'Album release year',
    example: 2001,
  })
  public year: number;

  @ApiProperty({
    description: 'Artist id',
    example: '85a0c8c7-a17e-4c70-8240-e998d2a718e4',
  })
  public artistId: string | null;

  constructor(name: string, year: number, artistId = null) {
    this.id = v4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
