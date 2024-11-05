import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { assertIsDefined } from 'src/utils/assertIsDefined';
import { ArtistRepository } from 'src/db/artist.repository';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/modules/artist/dto/update-artist.dto';
import { FavoritesRepository } from 'src/db/favorites.repository';
import { TrackRepository } from 'src/db/track.repository';
import { AlbumRepository } from 'src/db/album.repository';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly favoritesRepository: FavoritesRepository,
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  public async getArtist(id: string): Promise<ArtistEntity> {
    const artist: ArtistEntity | undefined = await this.artistRepository.get(
      id,
    );

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return artist;
  }

  public async getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistRepository.getAll();
  }

  public async createArtist(
    createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    const artist: ArtistEntity | undefined = await this.artistRepository.create(
      createArtistDto,
    );

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    return artist;
  }

  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist: ArtistEntity | undefined = await this.artistRepository.get(
      id,
    );

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.artistRepository.update(artist, updateArtistDto);

    return this.getArtist(id);
  }

  public async deleteArtist(id: string): Promise<void> {
    const artist: ArtistEntity | undefined = await this.artistRepository.get(
      id,
    );

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.artistRepository.delete(id);
    await this.trackRepository.removeArtistId(id);
    await this.albumRepository.removeArtistId(id);
    await this.favoritesRepository.deleteArtist(id);
  }
}
