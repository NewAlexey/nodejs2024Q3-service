import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Entity({ name: 'artist' })
export class ArtistEntity {
  @ApiProperty({
    description: 'Artist id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'Artist name',
    example: 'System of a down',
  })
  @Column()
  public name: string;

  @ApiProperty({
    description: '"Is artist gets grammy?" value',
    example: true,
  })
  @Column()
  public grammy: boolean;

  // @OneToMany(() => TrackEntity, (track) => track, { nullable: true })
  // tracks: TrackEntity[] | null;
  //
  // @OneToMany(() => AlbumEntity, (album) => album, { nullable: true })
  // albums: AlbumEntity[] | null;
}
