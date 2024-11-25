import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { assertIsDefined } from 'src/utils/assertIsDefined';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/modules/artist/dto/update-artist.dto';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  public async getArtist(id: string): Promise<ArtistEntity> {
    const artist: ArtistEntity | undefined =
      await this.artistRepository.findOne({
        where: { id },
      });

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.NOT_FOUND,
    );

    return artist;
  }

  public async getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistRepository.find();
  }

  public async createArtist(
    createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    const artist: ArtistEntity | undefined =
      this.artistRepository.create(createArtistDto);

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    await this.artistRepository.insert(artist);

    return artist;
  }

  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist: ArtistEntity | undefined =
      await this.artistRepository.findOne({ where: { id } });

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.artistRepository.update(id, updateArtistDto);

    return this.getArtist(id);
  }

  public async deleteArtist(id: string): Promise<void> {
    const artist: ArtistEntity | undefined =
      await this.artistRepository.findOne({ where: { id } });

    assertIsDefined(
      artist,
      HttpException,
      'Artist does not exist.',
      HttpStatus.NOT_FOUND,
    );

    await this.artistRepository.delete(id);
    await this.trackRepository.update({ artistId: id }, { artistId: null });
    await this.albumRepository.update({ artistId: id }, { artistId: null });
  }
}
