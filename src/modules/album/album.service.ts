import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { assertIsDefined } from 'src/utils/assertIsDefined';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/modules/album/dto/update-album.dto';
import { AlbumRepository } from 'src/db/album.repository';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { FavoritesRepository } from 'src/db/favorites.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  public async getAlbum(id: string): Promise<AlbumEntity> {
    const album: AlbumEntity | undefined = await this.albumRepository.get(id);

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return album;
  }

  public async getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumRepository.getAll();
  }

  public async createAlbum(createDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album: AlbumEntity | undefined = await this.albumRepository.create(
      createDto,
    );

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    return album;
  }

  public async updateAlbum(
    id: string,
    updateDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album: AlbumEntity | undefined = await this.albumRepository.get(id);

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.albumRepository.update(album, updateDto);

    return this.getAlbum(id);
  }

  public async deleteAlbum(id: string): Promise<void> {
    const album: AlbumEntity | undefined = await this.albumRepository.get(id);

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.albumRepository.delete(id);
    await this.favoritesRepository.deleteAlbum(id);
  }
}
