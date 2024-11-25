import { Injectable } from '@nestjs/common';

import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Injectable()
export class FavoritesRepository {
  private readonly favoriteInstance = new FavoriteEntity();

  public async get(): Promise<FavoriteEntity> {
    return this.favoriteInstance;
  }

  public async addTrack(track: TrackEntity): Promise<void> {
    this.favoriteInstance.tracks.push(track);
  }

  public async getTrack(id: string): Promise<undefined | TrackEntity> {
    return this.favoriteInstance.tracks.find((entity) => entity.id === id);
  }

  public async deleteTrack(id: string): Promise<void> {
    this.favoriteInstance.tracks = this.favoriteInstance.tracks.filter(
      (entity) => entity.id !== id,
    );
  }

  public async addArtist(artist: ArtistEntity): Promise<void> {
    this.favoriteInstance.artists.push(artist);
  }

  public async getArtist(id: string): Promise<undefined | ArtistEntity> {
    return this.favoriteInstance.artists.find((entity) => entity.id === id);
  }

  public async deleteArtist(id: string): Promise<void> {
    this.favoriteInstance.artists = this.favoriteInstance.artists.filter(
      (entity) => entity.id !== id,
    );
  }

  public async addAlbum(album: AlbumEntity): Promise<void> {
    this.favoriteInstance.albums.push(album);
  }

  public async getAlbum(id: string): Promise<undefined | AlbumEntity> {
    return this.favoriteInstance.albums.find((entity) => entity.id === id);
  }

  public async deleteAlbum(id: string): Promise<void> {
    this.favoriteInstance.albums = this.favoriteInstance.albums.filter(
      (entity) => entity.id !== id,
    );
  }
}
