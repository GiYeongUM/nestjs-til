import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { TErrorCode } from '../define/api-error-code';

@Catch(HttpException)
export class HttpApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpApiExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | TErrorCode;

    this.logger.error(error);

    if (typeof error === 'string') {
      response
        .status(status)
        .json({ success: false, statusCode: status, message: error });
    } else {
      response.status(status).json({
        success: false,
        ...error,
        // statusCode: status,
        // message: error.message[0],
      });
    }
  }
}
