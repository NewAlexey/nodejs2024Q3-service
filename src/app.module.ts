import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { LoggerMiddleware } from 'src/middleware/LoggerMiddleware';
import { LoggerModule } from 'src/modules/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeormOptions,
    }),
    LoggerModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    return consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
