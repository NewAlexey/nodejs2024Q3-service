import { Module } from '@nestjs/common';

import { AlbumController } from 'src/modules/album/album.controller';
import { AlbumService } from 'src/modules/album/album.service';
import { AppRepositoryModule } from 'src/db/app.repository.module';

@Module({
  imports: [AppRepositoryModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
