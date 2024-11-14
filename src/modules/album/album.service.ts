import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { assertIsDefined } from 'src/utils/assertIsDefined';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/modules/album/dto/update-album.dto';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  public async getAlbum(id: string): Promise<AlbumEntity> {
    const album: AlbumEntity | undefined = await this.albumRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return album;
  }

  public async getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumRepository.find();
  }

  public async createAlbum(createDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album: AlbumEntity | undefined =
      this.albumRepository.create(createDto);

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    await this.albumRepository.insert(album);

    return album;
  }

  public async updateAlbum(
    id: string,
    updateDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album: AlbumEntity | undefined = await this.albumRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.albumRepository.update(id, updateDto);

    return this.getAlbum(id);
  }

  public async deleteAlbum(id: string): Promise<void> {
    const album: AlbumEntity | undefined = await this.albumRepository.findOne({
      where: { id },
    });

    assertIsDefined(
      album,
      HttpException,
      'Album does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.albumRepository.delete(id);
    await this.trackRepository.update({ albumId: id }, { albumId: null });
  }
}
