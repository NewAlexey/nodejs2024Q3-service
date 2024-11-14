import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackController } from 'src/modules/track/track.controller';
import { TrackService } from 'src/modules/track/track.service';
import { TrackEntity } from 'src/modules/track/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
