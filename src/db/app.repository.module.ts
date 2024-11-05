import { Module } from '@nestjs/common';

import { TrackRepository } from 'src/db/track.repository';
import { UserRepository } from 'src/db/user.repository';
import { ArtistRepository } from 'src/db/artist.repository';
import { AlbumRepository } from 'src/db/album.repository';
import { FavoritesRepository } from 'src/db/favorites.repository';

@Module({
  providers: [
    TrackRepository,
    UserRepository,
    ArtistRepository,
    AlbumRepository,
    FavoritesRepository,
  ],
  exports: [
    TrackRepository,
    UserRepository,
    ArtistRepository,
    AlbumRepository,
    FavoritesRepository,
  ],
})
export class AppRepositoryModule {}
