import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Entity({ name: 'track' })
export class TrackEntity {
  @ApiProperty({
    description: 'Track id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'Track name (title)',
    example: 'B.Y.O.B.',
  })
  @Column()
  public name: string;

  @ApiProperty({
    description: 'Track duration',
    example: 4.23,
  })
  @Column({ type: 'float' })
  public duration: number;

  @ApiProperty({
    description: 'Artist id',
    example: '85a0c8c7-a17e-4c70-8240-e998d2a718e4',
    required: false,
  })
  @Column({ default: null })
  // @ManyToOne(() => ArtistEntity, (artist) => artist.id, { nullable: true })
  public artistId: string | null;

  @ApiProperty({
    description: 'Album id',
    example: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
    required: false,
  })
  @Column({ default: null })
  // @ManyToOne(() => AlbumEntity, (album) => album.id, { nullable: true })
  public albumId: string | null;
}
