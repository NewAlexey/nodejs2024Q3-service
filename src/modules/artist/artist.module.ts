import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistController } from 'src/modules/artist/artist.controller';
import { ArtistService } from 'src/modules/artist/artist.service';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, TrackEntity, AlbumEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
