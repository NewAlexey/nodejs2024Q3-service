import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';

@Entity({ name: 'album' })
export class AlbumEntity {
  @ApiProperty({
    description: 'Album id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'Album name',
    example: 'Toxicity',
  })
  @Column()
  public name: string;

  @ApiProperty({
    description: 'Album release year',
    example: 2001,
  })
  @Column()
  public year: number;

  @ApiProperty({
    description: 'Artist id',
    example: '85a0c8c7-a17e-4c70-8240-e998d2a718e4',
  })
  @Column({ default: null })
  public artistId: string | null;

  @ManyToMany(() => FavoriteEntity, (favourite) => favourite.tracks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  public favorites: FavoriteEntity[];
}
