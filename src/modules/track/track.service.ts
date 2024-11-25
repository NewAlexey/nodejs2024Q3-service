import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/modules/track/dto/update-track.dto';
import { assertIsDefined } from 'src/utils/assertIsDefined';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  public async getTrack(id: string): Promise<TrackEntity> {
    const track: TrackEntity | undefined = await this.trackRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return track;
  }

  public async getAllTracks(): Promise<TrackEntity[]> {
    return this.trackRepository.find();
  }

  public async createTrack(
    createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    const track: TrackEntity | undefined =
      this.trackRepository.create(createTrackDto);

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    await this.trackRepository.insert(track);

    return track;
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track: TrackEntity | undefined = await this.trackRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.trackRepository.update(id, updateTrackDto);

    return this.getTrack(id);
  }

  public async deleteTrack(id: string): Promise<void> {
    const track: TrackEntity | undefined = await this.trackRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.trackRepository.delete(id);
  }
}
