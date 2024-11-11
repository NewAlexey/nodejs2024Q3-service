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
import { ApiTags } from '@nestjs/swagger';

import { UserService } from 'src/modules/user/user.service';
import { FrontUserEntityType } from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  public getUser(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<FrontUserEntityType> {
    return this.userService.getUser(userId);
  }

  @Get('')
  public getAllUsers(): Promise<FrontUserEntityType[]> {
    return this.userService.getAllUsers();
  }

  @Post('')
  public createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<FrontUserEntityType> {
    return this.userService.createUser(createUserDto);
  }

  @Put('/:id')
  public updateUser(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<FrontUserEntityType> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteUser(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
