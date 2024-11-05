import { Module } from '@nestjs/common';

import { TrackRepository } from 'src/db/track.repository';
import { UserRepository } from 'src/db/user.repository';

@Module({
  providers: [TrackRepository, UserRepository],
  exports: [TrackRepository, UserRepository],
})
export class AppRepositoryModule {}
