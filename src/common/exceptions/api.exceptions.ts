import { HttpException } from '@nestjs/common';
import { TErrorCode } from '../define/api-error-code';

export class ApiExceptions extends HttpException {
  private readonly error: TErrorCode;

  constructor(error: TErrorCode) {
    super(error, error.statusCode);
    this.error = error;
  }
  getError(): TErrorCode {
    return this.error;
  }
}
