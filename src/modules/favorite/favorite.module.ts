import { Module } from '@nestjs/common';

import { FavoriteController } from 'src/modules/favorite/favorite.controller';
import { FavoriteService } from 'src/modules/favorite/favorite.service';
import { AppRepositoryModule } from 'src/db/app.repository.module';

@Module({
  imports: [AppRepositoryModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
