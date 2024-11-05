import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UserModule } from 'src/modules/user/user.module';
import { TrackModule } from 'src/modules/track/track.module';
import { AppRepositoryModule } from 'src/db/app.repository.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    AppRepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
