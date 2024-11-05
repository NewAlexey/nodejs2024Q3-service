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

import { AlbumService } from 'src/modules/album/album.service';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/modules/album/dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('/:id')
  public getAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<AlbumEntity> {
    return this.albumService.getAlbum(id);
  }

  @Get('')
  public getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumService.getAllAlbums();
  }

  @Post('')
  public createAlbum(@Body() createDto: CreateAlbumDto): Promise<AlbumEntity> {
    return this.albumService.createAlbum(createDto);
  }

  @Put('/:id')
  public updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return this.albumService.updateAlbum(id, updateDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}
