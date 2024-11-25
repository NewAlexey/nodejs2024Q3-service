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

import { TrackService } from 'src/modules/track/track.service';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/modules/track/dto/update-track.dto';
import { BadRequestErrorDto } from 'src/shared/bad-request-error.dto';
import { RequestNotFoundErrorDto } from 'src/shared/request-not-found-error.dto';
import { BadRequestErrorErrorListDto } from 'src/shared/bad-request-error.error-list.dto';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({
    description: 'Method to get track by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: TrackEntity,
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
  public getTrack(
    @Param('id', new ParseUUIDPipe()) trackId: string,
  ): Promise<TrackEntity> {
    return this.trackService.getTrack(trackId);
  }

  @ApiOperation({
    description: 'Method to get all tracks.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [TrackEntity],
  })
  @Get('')
  public getAllTracks(): Promise<TrackEntity[]> {
    return this.trackService.getAllTracks();
  }

  @ApiOperation({
    description: 'Method to create track.',
  })
  @ApiResponse({
    status: 201,
    description: 'Ok',
    type: TrackEntity,
  })
  @ApiBody({
    description: 'Object with track data.',
    type: CreateTrackDto,
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
  public createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    return this.trackService.createTrack(createTrackDto);
  }

  @ApiOperation({
    description: 'Method to update track data.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: TrackEntity,
  })
  @ApiBody({
    description: 'Object with track data.',
    type: UpdateTrackDto,
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
  public updateTrack(
    @Param('id', new ParseUUIDPipe()) trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return this.trackService.updateTrack(trackId, updateTrackDto);
  }

  @ApiOperation({
    description: 'Method to delete track by id.',
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
  public deleteTrack(
    @Param('id', new ParseUUIDPipe()) trackId: string,
  ): Promise<void> {
    return this.trackService.deleteTrack(trackId);
  }
}
