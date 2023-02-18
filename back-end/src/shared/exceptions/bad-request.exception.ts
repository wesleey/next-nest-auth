import { HttpStatus } from '../enums/http-status.enum';
import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
  constructor(message = 'Bad Request') {
    super(message, HttpStatus.BAD_REQUEST);
    this.name = 'BadRequestException';
  }
}
