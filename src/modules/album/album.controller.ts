import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AlbumService } from 'src/modules/album/album.service';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/modules/album/dto/update-album.dto';
import { RequestNotFoundErrorDto } from 'src/shared/request-not-found-error.dto';
import { BadRequestErrorDto } from 'src/shared/bad-request-error.dto';
import { BadRequestErrorErrorListDto } from 'src/shared/bad-request-error.error-list.dto';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({
    description: 'Method to get album by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: AlbumEntity,
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
  @Get('/:id')
  public getAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<AlbumEntity> {
    return this.albumService.getAlbum(id);
  }

  @ApiOperation({
    description: 'Method to get all albums.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [AlbumEntity],
  })
  @Get('')
  public getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumService.getAllAlbums();
  }

  @ApiOperation({
    description: 'Method to create album.',
  })
  @ApiResponse({
    status: 201,
    description: 'Ok',
    type: AlbumEntity,
  })
  @ApiBody({
    description: 'Object with album data.',
    type: CreateAlbumDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorErrorListDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Post('')
  public createAlbum(@Body() createDto: CreateAlbumDto): Promise<AlbumEntity> {
    return this.albumService.createAlbum(createDto);
  }

  @ApiOperation({
    description: 'Method to update album data.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: AlbumEntity,
  })
  @ApiBody({
    description: 'Object with artist data.',
    type: UpdateAlbumDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorErrorListDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
    type: RequestNotFoundErrorDto,
  })
  @Put('/:id')
  public updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return this.albumService.updateAlbum(id, updateDto);
  }

  @ApiOperation({
    description: 'Method to delete album by id.',
  })
  @ApiResponse({
    status: 204,
    description: 'Ok',
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
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}
