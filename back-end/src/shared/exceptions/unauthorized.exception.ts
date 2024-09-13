import { HttpStatus } from '../enums/http-status.enum';
import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED);
    this.name = 'UnauthorizedException';
  }
}
