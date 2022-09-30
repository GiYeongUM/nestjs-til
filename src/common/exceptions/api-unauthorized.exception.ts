import { ApiExceptions } from './api.exceptions';
import { ApiErrorCode } from '../define/api-error-code';

export class ApiUnauthorizedException extends ApiExceptions {
  constructor() {
    super(ApiErrorCode.UNAUTHORIZED_EXCEPTION);
  }
}
