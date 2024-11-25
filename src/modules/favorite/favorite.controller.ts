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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FavoriteService } from 'src/modules/favorite/favorite.service';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { RequestNotFoundErrorDto } from 'src/shared/request-not-found-error.dto';
import { BadRequestErrorDto } from 'src/shared/bad-request-error.dto';

@ApiTags('favs')
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({
    description: "Method to get user's favorites data.",
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: FavoriteEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
    type: RequestNotFoundErrorDto,
  })
  @Get('')
  public getFavorites(): Promise<FavoriteEntity> {
    return this.favoriteService.getFavorites();
  }

  @ApiOperation({
    description: "Method to add track to user's favorites track list.",
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: FavoriteEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity.',
    type: RequestNotFoundErrorDto,
  })
  @Post('/track/:id')
  public addTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoriteService.addTrack(id);
  }

  @ApiOperation({
    description:
      "Method to delete by id track from user's favorite track list.",
  })
  @ApiResponse({
    status: 204,
    description: 'No content.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
    type: RequestNotFoundErrorDto,
  })
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoriteService.removeTrack(id);
  }

  @ApiOperation({
    description: "Method to add artist to user's favorites artist list.",
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: FavoriteEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity.',
    type: RequestNotFoundErrorDto,
  })
  @Post('/artist/:id')
  public addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoriteService.addArtist(id);
  }

  @ApiOperation({
    description:
      "Method to delete by id artist from user's favorite artist list.",
  })
  @ApiResponse({
    status: 204,
    description: 'No content.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
    type: RequestNotFoundErrorDto,
  })
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoriteService.removeArtist(id);
  }

  @ApiOperation({
    description: "Method to add album to user's favorites album list.",
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: FavoriteEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity.',
    type: RequestNotFoundErrorDto,
  })
  @Post('/album/:id')
  public addAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoriteService.addAlbum(id);
  }

  @ApiOperation({
    description:
      "Method to delete by id album from user's favorite album list.",
  })
  @ApiResponse({
    status: 204,
    description: 'No content.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
    type: RequestNotFoundErrorDto,
  })
  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.favoriteService.removeAlbum(id);
  }
}
