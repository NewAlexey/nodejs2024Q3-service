import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User old password',
    example: 'qwerty',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: '123456',
  })
  @IsString()
  newPassword: string;
}
