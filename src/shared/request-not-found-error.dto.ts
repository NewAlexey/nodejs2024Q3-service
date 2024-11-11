import { ApiProperty } from '@nestjs/swagger';

export class RequestNotFoundErrorDto {
  @ApiProperty({
    description: 'HTTP error code',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Entity does not exist',
  })
  message: string;
}
