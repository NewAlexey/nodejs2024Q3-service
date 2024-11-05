import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TrackRepository } from 'src/db/track.repository';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/modules/track/dto/update-track.dto';
import { UserRepository } from 'src/db/user.repository';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getTrack(trackId: string): Promise<TrackEntity> {
    const track: TrackEntity | undefined = await this.trackRepository.get(
      trackId,
    );

    if (!track) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  public async getAllTracks(): Promise<TrackEntity[]> {
    console.log(
      'hehe getAllTracks call userRepository.getAll',
      await this.userRepository.getAll(),
    );

    return this.trackRepository.getAll();
  }

  public async createTrack(
    createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    const user: TrackEntity | undefined = await this.trackRepository.create(
      createTrackDto,
    );

    if (!user) {
      throw new HttpException(
        'User does not exist.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return user;
  }

  public async updateTrack(
    userId: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const existTrack: TrackEntity | undefined = await this.trackRepository.get(
      userId,
    );

    if (!existTrack) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    await this.trackRepository.update(existTrack, updateTrackDto);

    return this.getTrack(userId);
  }

  public async deleteTrack(trackId: string): Promise<void> {
    const existTrack: TrackEntity | undefined = await this.trackRepository.get(
      trackId,
    );

    if (!existTrack) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    await this.trackRepository.delete(trackId);
  }
}
