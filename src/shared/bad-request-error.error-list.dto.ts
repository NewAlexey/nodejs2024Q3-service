import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorErrorListDto {
  @ApiProperty({
    description: 'Bad request HTTP error code.',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Validation error message',
    example:
      '["name must be a string", "year must be a number conforming to the specified constraints"]',
  })
  message: string[];

  @ApiProperty({
    description: 'Error status',
    example: 'Bad Request',
  })
  error: string;
}
