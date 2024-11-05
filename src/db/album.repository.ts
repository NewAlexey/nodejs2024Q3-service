import { Injectable } from '@nestjs/common';

import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Injectable()
export class AlbumRepository {
  private readonly db: Map<string, AlbumEntity> = new Map();

  public async get(id: string): Promise<AlbumEntity | undefined> {
    return this.db.get(id);
  }

  public async getAll(): Promise<AlbumEntity[]> {
    return [...this.db.values()];
  }

  public async create(props: MethodProps): Promise<AlbumEntity> {
    const { name, year, artistId } = props;

    const album = new AlbumEntity(name, year, artistId);

    this.db.set(album.id, album);

    return this.get(album.id);
  }

  public async update(
    album: AlbumEntity,
    props: MethodProps,
  ): Promise<AlbumEntity> {
    album.name = props.name;
    album.year = props.year;
    album.artistId = props.artistId ?? null;

    return album;
  }

  public async delete(id: string): Promise<void> {
    this.db.delete(id);
  }

  public async removeArtistId(artistId: string): Promise<void> {
    const albumList = await this.getAll();

    albumList.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
}

type MethodProps = {
  name: string;
  year: number;
  artistId?: string | null;
};
