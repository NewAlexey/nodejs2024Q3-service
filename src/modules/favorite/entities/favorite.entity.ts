import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';

export class FavoriteEntity {
  public artists: ArtistEntity[] = [];
  public albums: AlbumEntity[] = [];
  public tracks: TrackEntity[] = [];
}
