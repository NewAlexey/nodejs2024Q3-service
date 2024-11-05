import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { FavoriteService } from 'src/modules/favorite/favorite.service';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get('')
  public getFavorites(): Promise<FavoriteEntity> {
    return this.favoriteService.getFavorites();
  }

  @Post('/track/:id')
  public addTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoriteService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoriteService.removeTrack(id);
  }

  @Post('/artist/:id')
  public addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoriteService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoriteService.removeArtist(id);
  }

  @Post('/album/:id')
  public addAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoriteService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoriteService.removeAlbum(id);
  }
}
