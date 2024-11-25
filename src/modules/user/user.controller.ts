import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from 'src/modules/user/user.service';
import { FrontUserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { BadRequestErrorDto } from 'src/shared/bad-request-error.dto';
import { RequestNotFoundErrorDto } from 'src/shared/request-not-found-error.dto';
import { BadRequestErrorErrorListDto } from 'src/shared/bad-request-error.error-list.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'Method to get user by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: FrontUserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
    type: RequestNotFoundErrorDto,
  })
  @Get('/:id')
  public getUser(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<FrontUserEntity> {
    return this.userService.getUser(userId);
  }

  @ApiOperation({
    description: 'Method to get all users.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [FrontUserEntity],
  })
  @Get('')
  public getAllUsers(): Promise<FrontUserEntity[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({
    description: 'Method to create user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Created.',
    type: FrontUserEntity,
  })
  @ApiBody({
    description: 'Object with user data.',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorErrorListDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Post('')
  public createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<FrontUserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({
    description: 'Method to update user data.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: FrontUserEntity,
  })
  @ApiBody({
    description: 'Object with user data.',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorErrorListDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
    type: RequestNotFoundErrorDto,
  })
  @Put('/:id')
  public updateUser(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<FrontUserEntity> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @ApiOperation({
    description: 'Method to delete user by id.',
  })
  @ApiResponse({
    status: 204,
    description: 'No content.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: BadRequestErrorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
    type: RequestNotFoundErrorDto,
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteUser(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
