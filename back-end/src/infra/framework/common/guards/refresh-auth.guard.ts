import { UnauthorizedException } from '@/shared/exceptions/unauthorized.exception';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid refresh token');
    }
    return user;
  }
}
