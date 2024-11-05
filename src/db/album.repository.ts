import { Injectable } from '@nestjs/common';

import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Injectable()
export class AlbumRepository {
  private readonly db: Map<string, AlbumEntity> = new Map();

  public async get(artistId: string): Promise<AlbumEntity | undefined> {
    return this.db.get(artistId);
  }

  public async getAll(): Promise<AlbumEntity[]> {
    return [...this.db.values()];
  }

  public async create(props: MethodProps): Promise<AlbumEntity> {
    const { name, year, artistId } = props;

    const newArtist = new AlbumEntity(name, year, artistId);

    this.db.set(newArtist.id, newArtist);

    return this.get(newArtist.id);
  }

  public async update(
    artist: AlbumEntity,
    props: MethodProps,
  ): Promise<AlbumEntity> {
    artist.name = props.name;
    artist.year = props.year;
    artist.artistId = props.artistId ?? null;

    return artist;
  }

  public async delete(artistId: string): Promise<void> {
    this.db.delete(artistId);
  }
}

type MethodProps = {
  name: string;
  year: number;
  artistId?: string | null;
};
