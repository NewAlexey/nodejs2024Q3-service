import { Module } from '@nestjs/common';

import { TrackController } from 'src/modules/track/track.controller';
import { TrackService } from 'src/modules/track/track.service';
import { AppRepositoryModule } from 'src/db/app.repository.module';

@Module({
  imports: [AppRepositoryModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
