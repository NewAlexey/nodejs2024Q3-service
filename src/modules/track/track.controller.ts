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

import { TrackService } from 'src/modules/track/track.service';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/modules/track/dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('/:id')
  public getTrack(
    @Param('id', new ParseUUIDPipe()) trackId: string,
  ): Promise<TrackEntity> {
    return this.trackService.getTrack(trackId);
  }

  @Get('')
  public getAllTracks(): Promise<TrackEntity[]> {
    return this.trackService.getAllTracks();
  }

  @Post('')
  public createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put('/:id')
  public updateTrack(
    @Param('id', new ParseUUIDPipe()) trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return this.trackService.updateTrack(trackId, updateTrackDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTrack(
    @Param('id', new ParseUUIDPipe()) trackId: string,
  ): Promise<void> {
    return this.trackService.deleteTrack(trackId);
  }
}
