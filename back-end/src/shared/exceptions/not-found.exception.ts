import { HttpStatus } from '../enums/http-status.enum';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(message = 'Not Found') {
    super(message, HttpStatus.NOT_FOUND);
    this.name = 'NotFoundException';
  }
}
