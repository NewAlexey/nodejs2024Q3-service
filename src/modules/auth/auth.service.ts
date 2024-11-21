import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SignActionUserDto } from 'src/modules/auth/dto/sign-action-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { HashService } from 'src/modules/auth/hash.service';
import { assertIsDefined } from 'src/utils/assertIsDefined';
import { JwtService } from 'src/modules/auth/jwt.service';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUpUser(props: SignActionUserDto): Promise<void> {
    const { login, password } = props;

    const hashedPassword = await this.hashService.hashValue(password);

    await this.userService.createUser({
      login,
      password: hashedPassword,
    });
  }

  public async signInUser(
    props: SignActionUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { login, password } = props;

    const user = await this.userService.getUserByLogin(login);

    assertIsDefined(
      user,
      HttpException,
      'User does not exist.',
      HttpStatus.NOT_FOUND,
    );

    const isPasswordEqual = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordEqual) {
      throw new HttpException("Password doesn't match", HttpStatus.FORBIDDEN);
    }

    const jwtData = {
      userId: user.id,
      login: user.login,
    };

    return {
      accessToken: this.jwtService.generateAccessToken(jwtData),
      refreshToken: this.jwtService.generateRefreshToken(jwtData),
    };
  }

  public async refreshToken(
    refreshToken: string,
  ): Promise<{ refreshToken: string }> {
    try {
      const tokenData = this.jwtService.verifyRefreshToken(refreshToken);
      const newToken = this.jwtService.generateRefreshToken({
        userId: tokenData.userId,
        login: tokenData.login,
      });

      return { refreshToken: newToken };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException('Token are expired.', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Bad token structure.', HttpStatus.UNAUTHORIZED);
    }
  }
}
