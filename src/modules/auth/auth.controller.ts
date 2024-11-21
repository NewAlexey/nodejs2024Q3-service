import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from 'src/modules/auth/auth.service';
import { SignActionUserDto } from 'src/modules/auth/dto/sign-action-user.dto';
import { RefreshTokenDto } from 'src/modules/auth/dto/refresh-token.dto';
import { Public } from 'src/modules/auth/permission/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  public async signUp(@Body() signUpUserDto: SignActionUserDto): Promise<void> {
    return this.authService.signUpUser(signUpUserDto);
  }

  @Public()
  @Post('/signin')
  public async signIn(
    @Body() signInUserDto: SignActionUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signInUser(signInUserDto);
  }

  @Post('/refresh')
  public async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<{ refreshToken: string }> {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
