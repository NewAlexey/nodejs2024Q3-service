import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { assertIsDefined } from 'src/utils/assertIsDefined';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  public async getFavorites(): Promise<FavoriteEntity> {
    const favorites: FavoriteEntity[] | undefined =
      await this.favoriteRepository.find();

    if (!favorites[0]) {
      const favorite = this.favoriteRepository.create(new FavoriteEntity());
      await this.favoriteRepository.insert(favorite);

      return favorite;
    }

    assertIsDefined(
      favorites[0],
      HttpException,
      'Favorites does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return favorites[0];
  }

  public async addTrack(id: string): Promise<void> {
    const track: TrackEntity | undefined = await this.trackRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      track,
      HttpException,
      'Track does not exist.',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    const favorite: FavoriteEntity = await this.getFavorites();
    const updatedTrackList = [...favorite.tracks, track];

    await this.favoriteRepository.update(favorite.id, {
      tracks: updatedTrackList,
    });
  }

  public async removeTrack(id: string): Promise<void> {
    const favorite: FavoriteEntity | undefined = await this.getFavorites();
    const track: TrackEntity | undefined = favorite.tracks.find(
      (track) => track.id === id,
    );

    assertIsDefined(
      track,
      HttpException,
      'Track is not favorite.',
      HttpStatus.NOT_FOUND,
    );

    const updatedTrackList = favorite.tracks.filter((track) => track.id !== id);

    await this.favoriteRepository.update(favorite.id, {
      tracks: updatedTrackList,
    });
  }

  public async addArtist(id: string): Promise<void> {
    const artist: ArtistEntity | undefined =
      await this.artistRepository.findOne({
        where: { id },
      });

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    const favorite: FavoriteEntity = await this.getFavorites();
    const updatedArtistList = [...favorite.artists, artist];

    await this.favoriteRepository.update(favorite.id, {
      artists: updatedArtistList,
    });
  }

  public async removeArtist(id: string): Promise<void> {
    const favorite: FavoriteEntity | undefined = await this.getFavorites();
    const artist: ArtistEntity | undefined = favorite.artists.find(
      (artist) => artist.id === id,
    );

    assertIsDefined(
      artist,
      HttpException,
      'Artist is not favorite.',
      HttpStatus.NOT_FOUND,
    );

    const updatedArtistList = favorite.artists.filter(
      (artist) => artist.id !== id,
    );

    await this.favoriteRepository.update(favorite.id, {
      artists: updatedArtistList,
    });
  }

  public async addAlbum(id: string): Promise<void> {
    const album: AlbumEntity | undefined = await this.albumRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    const favorite: FavoriteEntity = await this.getFavorites();
    const updatedAlbumList = [...favorite.albums, album];

    await this.favoriteRepository.update(favorite.id, {
      albums: updatedAlbumList,
    });
  }

  public async removeAlbum(id: string): Promise<void> {
    const favorite: FavoriteEntity | undefined = await this.getFavorites();
    const album: AlbumEntity | undefined = favorite.albums.find(
      (album) => album.id === id,
    );

    assertIsDefined(
      album,
      HttpException,
      'Album is not favorite.',
      HttpStatus.NOT_FOUND,
    );

    const updatedAlbumList = favorite.albums.filter((album) => album.id !== id);

    await this.favoriteRepository.update(favorite.id, {
      albums: updatedAlbumList,
    });
  }
}
