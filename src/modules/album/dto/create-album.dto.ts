import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Album name',
    example: 'Toxicity',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Album release year',
    example: 2001,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'Artist id',
    example: '85a0c8c7-a17e-4c70-8240-e998d2a718e4',
  })
  @IsUUID(4)
  @IsOptional()
  artistId: string;
}
