import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from 'src/modules/auth/permission/public.decorator';
import { JwtService } from 'src/modules/auth/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicHandler = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublicHandler) {
      return true;
    }

    try {
      const request = context.switchToHttp().getRequest();
      const token: string | undefined =
        request.headers.authorization?.split(' ')[1];
      this.jwtService.verifyAccessToken(token);

      return true;
    } catch (error) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
