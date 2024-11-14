import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumController } from 'src/modules/album/album.controller';
import { AlbumService } from 'src/modules/album/album.service';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
