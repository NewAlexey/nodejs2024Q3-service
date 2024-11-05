import { Module } from '@nestjs/common';

import { ArtistController } from 'src/modules/artist/artist.controller';
import { ArtistService } from 'src/modules/artist/artist.service';
import { AppRepositoryModule } from 'src/db/app.repository.module';

@Module({
  imports: [AppRepositoryModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
