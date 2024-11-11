import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteEntity {
  @ApiProperty({
    description: "'User's list of favorites artists.",
    example: [ArtistEntity],
  })
  public artists: ArtistEntity[] = [];

  @ApiProperty({
    description: "'User's list of favorites artists.",
    example: [AlbumEntity],
  })
  public albums: AlbumEntity[] = [];

  @ApiProperty({
    description: "'User's list of favorites artists.",
    example: [TrackEntity],
  })
  public tracks: TrackEntity[] = [];
}
