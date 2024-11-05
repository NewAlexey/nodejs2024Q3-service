import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TrackRepository } from 'src/db/track.repository';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/modules/track/dto/update-track.dto';
import { assertIsDefined } from 'src/utils/assertIsDefined';
import { FavoritesRepository } from 'src/db/favorites.repository';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  public async getTrack(trackId: string): Promise<TrackEntity> {
    const track: TrackEntity | undefined = await this.trackRepository.get(
      trackId,
    );

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return track;
  }

  public async getAllTracks(): Promise<TrackEntity[]> {
    return this.trackRepository.getAll();
  }

  public async createTrack(
    createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    const track: TrackEntity | undefined = await this.trackRepository.create(
      createTrackDto,
    );

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    return track;
  }

  public async updateTrack(
    trackId: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track: TrackEntity | undefined = await this.trackRepository.get(
      trackId,
    );

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.trackRepository.update(track, updateTrackDto);

    return this.getTrack(trackId);
  }

  public async deleteTrack(trackId: string): Promise<void> {
    const track: TrackEntity | undefined = await this.trackRepository.get(
      trackId,
    );

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.trackRepository.delete(trackId);
    await this.favoritesRepository.deleteTrack(trackId);
  }
}
