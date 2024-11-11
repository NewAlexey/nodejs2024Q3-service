import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Track name (title)',
    example: 'B.Y.O.B.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Track duration',
    example: 4.23,
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'Artist id',
    example: '85a0c8c7-a17e-4c70-8240-e998d2a718e4',
  })
  @IsUUID(4)
  @IsOptional()
  artistId?: null | string;

  @ApiProperty({
    description: 'Album id',
    example: '85a0c8c7-a17e-4c70-8240-e998d2a718e4',
  })
  @IsUUID(4)
  @IsOptional()
  albumId?: null | string;
}
