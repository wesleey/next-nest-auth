import { HttpStatus } from '../enums/http-status.enum';
import { BaseException } from './base.exception';

export class ConflictException extends BaseException {
  constructor(message = 'Conflict') {
    super(message, HttpStatus.CONFLICT);
    this.name = 'ConflictException';
  }
}
