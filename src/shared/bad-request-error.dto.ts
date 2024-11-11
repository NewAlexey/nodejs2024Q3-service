import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorDto {
  @ApiProperty({
    description: 'Bad request HTTP error code.',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Validation error message',
    example: 'Validation failed (uuid  is expected)',
  })
  message: string;
}
