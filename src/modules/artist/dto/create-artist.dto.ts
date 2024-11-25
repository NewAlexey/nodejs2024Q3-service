import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    description: 'Artist name',
    example: 'System of a down',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '"Is artist gets grammy?" value',
    example: true,
  })
  @IsBoolean()
  grammy: boolean;
}
