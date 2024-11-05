import { Injectable } from '@nestjs/common';

import { TrackEntity } from 'src/modules/track/entities/track.entity';

@Injectable()
export class TrackRepository {
  private readonly db: Map<string, TrackEntity> = new Map();

  public async get(trackId: string): Promise<TrackEntity | undefined> {
    return this.db.get(trackId);
  }

  public async getAll(): Promise<TrackEntity[]> {
    return [...this.db.values()];
  }

  public async create(props: MethodProps): Promise<TrackEntity> {
    return {} as TrackEntity;
  }

  public async update(
    track: TrackEntity,
    props: MethodProps,
  ): Promise<TrackEntity> {
    return {} as TrackEntity;
  }

  public async delete(trackId: string): Promise<void> {
    return;
  }
}

type MethodProps = {
  name: string;
  duration: number;
  artistId?: null | string;
  albumId?: null | string;
};
