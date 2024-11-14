import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteController } from 'src/modules/favorite/favorite.controller';
import { FavoriteService } from 'src/modules/favorite/favorite.service';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteEntity,
      ArtistEntity,
      TrackEntity,
      AlbumEntity,
    ]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
