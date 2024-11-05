import { Module } from '@nestjs/common';

import { TrackRepository } from 'src/db/track.repository';
import { UserRepository } from 'src/db/user.repository';
import { ArtistRepository } from 'src/db/artist.repository';

@Module({
  providers: [TrackRepository, UserRepository, ArtistRepository],
  exports: [TrackRepository, UserRepository, ArtistRepository],
})
export class AppRepositoryModule {}
