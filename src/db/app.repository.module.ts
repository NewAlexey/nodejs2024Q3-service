import { Module } from '@nestjs/common';

import { TrackRepository } from 'src/db/track.repository';
import { UserRepository } from 'src/db/user.repository';
import { ArtistRepository } from 'src/db/artist.repository';
import { AlbumRepository } from 'src/db/album.repository';

@Module({
  providers: [
    TrackRepository,
    UserRepository,
    ArtistRepository,
    AlbumRepository,
  ],
  exports: [TrackRepository, UserRepository, ArtistRepository, AlbumRepository],
})
export class AppRepositoryModule {}
