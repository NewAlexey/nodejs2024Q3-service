import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
