import { Injectable } from '@nestjs/common';

import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';

@Injectable()
export class ArtistRepository {
  private readonly db: Map<string, ArtistEntity> = new Map();

  public async get(artistId: string): Promise<ArtistEntity | undefined> {
    return this.db.get(artistId);
  }

  public async getAll(): Promise<ArtistEntity[]> {
    return [...this.db.values()];
  }

  public async create(props: MethodProps): Promise<ArtistEntity> {
    const { name, grammy } = props;

    const newArtist = new ArtistEntity(name, grammy);

    this.db.set(newArtist.id, newArtist);

    return this.get(newArtist.id);
  }

  public async update(
    artist: ArtistEntity,
    props: MethodProps,
  ): Promise<ArtistEntity> {
    artist.name = props.name;
    artist.grammy = props.grammy;

    return artist;
  }

  public async delete(artistId: string): Promise<void> {
    this.db.delete(artistId);
  }
}

type MethodProps = {
  name: string;
  grammy: boolean;
};
