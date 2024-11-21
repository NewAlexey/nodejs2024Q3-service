import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UserModule } from 'src/modules/user/user.module';
import { TrackModule } from 'src/modules/track/track.module';
import { ArtistModule } from 'src/modules/artist/artist.module';
import { AlbumModule } from 'src/modules/album/album.module';
import { FavoriteModule } from 'src/modules/favorite/favorite.module';
import { getTypeormOptions } from 'src/config/ormconfig';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthGuard } from 'src/modules/auth/permission/auth.guard';
import { JwtService } from 'src/modules/auth/jwt.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeormOptions,
    }),
    AuthModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
