import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';

@Entity({ name: 'favs' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @ApiProperty({
    isArray: true,
    type: () => ArtistEntity,
    description: "User's list of favorites artists.",
  })
  @ManyToMany(() => ArtistEntity, (artist) => artist.favorites, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  public artists: ArtistEntity[];

  @ApiProperty({
    isArray: true,
    type: () => AlbumEntity,
    description: "User's list of favorites albums.",
  })
  @ManyToMany(() => AlbumEntity, (album) => album.favorites, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  public albums: AlbumEntity[];

  @ApiProperty({
    isArray: true,
    type: () => TrackEntity,
    description: "User's list of favorites tracks.",
  })
  @ManyToMany(() => TrackEntity, (track) => track.favorites, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  public tracks: TrackEntity[];
}
