import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly accessSecret: string;
  private readonly accessExpiresIn: string;

  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: string;

  constructor() {
    const accessSecret = process.env.JWT_SECRET_KEY;
    const accessExpiresIn = process.env.TOKEN_EXPIRE_TIME;

    const refreshSecret = process.env.JWT_SECRET_REFRESH_KEY;
    const refreshExpiresIn = process.env.TOKEN_REFRESH_EXPIRE_TIME;

    if (
      !accessSecret ||
      !refreshSecret ||
      !accessExpiresIn ||
      !refreshExpiresIn
    ) {
      throw new Error('Check environment variables for jwt service.');
    }

    this.accessSecret = accessSecret;
    this.accessExpiresIn = accessExpiresIn;
    this.refreshSecret = refreshSecret;
    this.refreshExpiresIn = refreshExpiresIn;
  }

  public generateAccessToken(data: JwtTokenPayload): string {
    return this.generateJwt(data, this.accessSecret, this.accessExpiresIn);
  }

  public generateRefreshToken(data: JwtTokenPayload): string {
    return this.generateJwt(data, this.refreshSecret, this.refreshExpiresIn);
  }

  public verifyAccessToken(token: string): JwtTokenPayload {
    return this.verifyJwt(token, this.accessSecret);
  }

  public verifyRefreshToken(token: string): JwtTokenPayload {
    return this.verifyJwt(token, this.refreshSecret);
  }

  private verifyJwt(token: string, secret: string): JwtTokenPayload {
    return verify(token, secret) as JwtTokenPayload;
  }

  private generateJwt(
    data: JwtTokenPayload,
    secret: string,
    expiresIn: string,
  ): string {
    return sign(data, secret, { expiresIn });
  }
}

type JwtTokenPayload = {
  userId: string;
  login: string;
};
