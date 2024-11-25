import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignActionUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Alexey',
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
  })
  @IsString()
  password: string;
}
