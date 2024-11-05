import { Injectable } from '@nestjs/common';

import { TrackEntity } from 'src/modules/track/entities/track.entity';

@Injectable()
export class TrackRepository {
  private readonly db: Map<string, TrackEntity> = new Map();

  public async get(id: string): Promise<TrackEntity | undefined> {
    return this.db.get(id);
  }

  public async getAll(): Promise<TrackEntity[]> {
    return [...this.db.values()];
  }

  public async create(props: MethodProps): Promise<TrackEntity> {
    const { name, duration, artistId, albumId } = props;

    const newTrack = new TrackEntity(name, duration, artistId, albumId);

    this.db.set(newTrack.id, newTrack);

    return this.get(newTrack.id);
  }

  public async update(
    track: TrackEntity,
    props: MethodProps,
  ): Promise<TrackEntity> {
    track.name = props.name;
    track.duration = props.duration;
    track.albumId = props.albumId ?? null;
    track.artistId = props.artistId ?? null;

    return track;
  }

  public async delete(id: string): Promise<void> {
    this.db.delete(id);
  }

  public async removeArtistId(artistId: string): Promise<void> {
    const trackList = await this.getAll();

    trackList.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
}

type MethodProps = {
  name: string;
  duration: number;
  artistId?: null | string;
  albumId?: null | string;
};
