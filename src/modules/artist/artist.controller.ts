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

import { ArtistService } from 'src/modules/artist/artist.service';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/modules/artist/dto/update-artist.dto';
import { BadRequestErrorDto } from 'src/shared/bad-request-error.dto';
import { RequestNotFoundErrorDto } from 'src/shared/request-not-found-error.dto';
import { BadRequestErrorErrorListDto } from 'src/shared/bad-request-error.error-list.dto';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({
    description: 'Method to get artist by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: ArtistEntity,
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
  public getArtist(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ): Promise<ArtistEntity> {
    return this.artistService.getArtist(artistId);
  }

  @ApiOperation({
    description: 'Method to get all artists.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [ArtistEntity],
  })
  @Get('')
  public getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistService.getAllArtists();
  }

  @ApiOperation({
    description: 'Method to create artist.',
  })
  @ApiResponse({
    status: 201,
    description: 'Created.',
    type: ArtistEntity,
  })
  @ApiBody({
    description: 'Object with artist data.',
    type: CreateArtistDto,
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
  public createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.createArtist(createArtistDto);
  }

  @ApiOperation({
    description: 'Method to update artist data.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: ArtistEntity,
  })
  @ApiBody({
    description: 'Object with artist data.',
    type: UpdateArtistDto,
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
  public updateArtist(
    @Param('id', new ParseUUIDPipe()) artistId: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.updateArtist(artistId, updateArtistDto);
  }

  @ApiOperation({
    description: 'Method to delete artist by id.',
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
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteArtist(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ): Promise<void> {
    return this.artistService.deleteArtist(artistId);
  }
}
