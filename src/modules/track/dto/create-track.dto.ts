import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  @IsOptional()
  artistId?: null | string;

  @IsString()
  @IsOptional()
  albumId?: null | string;
}
