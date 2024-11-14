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
    description: "User's list of favorites artists.",
    example: [ArtistEntity],
  })
  @ManyToMany(() => ArtistEntity, (artist) => artist.favorites, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  public artists: ArtistEntity[];

  @ApiProperty({
    description: "User's list of favorites artists.",
    example: [AlbumEntity],
  })
  @ManyToMany(() => AlbumEntity, (album) => album.favorites, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  public albums: AlbumEntity[];

  @ApiProperty({
    description: "User's list of favorites artists.",
    example: [TrackEntity],
  })
  @ManyToMany(() => TrackEntity, (track) => track.favorites, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  public tracks: TrackEntity[];
}
