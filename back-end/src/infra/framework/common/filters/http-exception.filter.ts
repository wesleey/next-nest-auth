import { BaseException } from '@/shared/exceptions/base.exception';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof BaseException
        ? exception.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof BaseException
        ? exception.message
        : exception;

    this.logger.error(
      `status ${status}: ${JSON.stringify(message)}`,
      exception instanceof Error ? exception.name : AllExceptionsFilter.name,
    );

    response.status(status).json({
      path: request.url,
      error: message,
      timestamp: new Date().toISOString(),
    });
  }
}
