import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';

@Entity({ name: 'artist' })
export class ArtistEntity {
  @ApiProperty({
    description: 'Artist id',
    example: '9c5b94b1-35ad-49bb-b118-8e8fc24abf80',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'Artist name',
    example: 'System of a down',
  })
  @Column()
  public name: string;

  @ApiProperty({
    description: '"Is artist gets grammy?" value',
    example: true,
  })
  @Column()
  public grammy: boolean;

  @ManyToMany(() => FavoriteEntity, (favourite) => favourite.tracks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  public favorites: FavoriteEntity[];
}
