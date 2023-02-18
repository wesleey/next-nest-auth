import { UnauthorizedException } from '@/shared/exceptions/unauthorized.exception';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { isEmail, minLength } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    const isValidEmail = isEmail(email);
    if (!isValidEmail) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    const isValidPassword = minLength(password, 8);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    next();
  }
}
