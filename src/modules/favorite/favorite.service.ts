import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { assertIsDefined } from 'src/utils/assertIsDefined';
import { FavoritesRepository } from 'src/db/favorites.repository';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { TrackRepository } from 'src/db/track.repository';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { ArtistRepository } from 'src/db/artist.repository';
import { AlbumRepository } from 'src/db/album.repository';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoritesRepository,
    private readonly trackRepository: TrackRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  public async getFavorites(): Promise<FavoriteEntity> {
    const favorites: FavoriteEntity | undefined =
      await this.favoriteRepository.get();

    assertIsDefined(
      favorites,
      HttpException,
      'Favorites does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return favorites;
  }

  public async addTrack(id: string): Promise<void> {
    const track: TrackEntity | undefined = await this.trackRepository.get(id);

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    await this.favoriteRepository.addTrack(track);
  }

  public async removeTrack(id: string): Promise<void> {
    const track: TrackEntity | undefined =
      await this.favoriteRepository.getTrack(id);

    assertIsDefined(
      track,
      HttpException,
      'Track is not favorite.',
      HttpStatus.NOT_FOUND,
    );

    await this.favoriteRepository.deleteTrack(track.id);
  }

  public async addArtist(id: string): Promise<void> {
    const artist: ArtistEntity | undefined = await this.artistRepository.get(
      id,
    );

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    await this.favoriteRepository.addArtist(artist);
  }

  public async removeArtist(id: string): Promise<void> {
    const artist: ArtistEntity | undefined =
      await this.favoriteRepository.getArtist(id);

    assertIsDefined(
      artist,
      HttpException,
      'Artist is not favorite.',
      HttpStatus.NOT_FOUND,
    );

    await this.favoriteRepository.deleteArtist(artist.id);
  }

  public async addAlbum(id: string): Promise<void> {
    const album: AlbumEntity | undefined = await this.albumRepository.get(id);

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    await this.favoriteRepository.addAlbum(album);
  }

  public async removeAlbum(id: string): Promise<void> {
    const album: AlbumEntity | undefined =
      await this.favoriteRepository.getAlbum(id);

    assertIsDefined(
      album,
      HttpException,
      'Album is not favorite.',
      HttpStatus.NOT_FOUND,
    );

    await this.favoriteRepository.deleteAlbum(album.id);
  }
}
