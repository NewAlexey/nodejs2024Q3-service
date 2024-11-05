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

import { ArtistService } from 'src/modules/artist/artist.service';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/modules/artist/dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('/:id')
  public getArtist(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ): Promise<ArtistEntity> {
    return this.artistService.getArtist(artistId);
  }

  @Get('')
  public getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistService.getAllArtists();
  }

  @Post('')
  public createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put('/:id')
  public updateArtist(
    @Param('id', new ParseUUIDPipe()) artistId: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.updateArtist(artistId, updateArtistDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteArtist(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ): Promise<void> {
    return this.artistService.deleteArtist(artistId);
  }
}
