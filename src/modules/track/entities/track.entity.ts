import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class TrackEntity {
  @ApiProperty({
    description: 'Track id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  public id: string;

  @ApiProperty({
    description: 'Track name (title)',
    example: 'B.Y.O.B.',
  })
  public name: string;

  @ApiProperty({
    description: 'Track duration',
    example: 4.23,
  })
  public duration: number;

  @ApiProperty({
    description: 'Artist id',
    example: '85a0c8c7-a17e-4c70-8240-e998d2a718e4',
    required: false,
  })
  public artistId: string | null;

  @ApiProperty({
    description: 'Album id',
    example: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
    required: false,
  })
  public albumId: string | null;

  constructor(name: string, duration: number, artistId = null, albumId = null) {
    this.id = v4();
    this.name = name;
    this.duration = duration;
    this.artistId = artistId;
    this.albumId = albumId;
  }
}
