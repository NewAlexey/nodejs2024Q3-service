import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsUUID(4)
  @IsOptional()
  artistId?: null | string;

  @IsUUID(4)
  @IsOptional()
  albumId?: null | string;
}
