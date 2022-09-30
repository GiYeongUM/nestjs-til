import { ApiExceptions } from './api.exceptions';
import { ApiErrorCode } from '../define/api-error-code';

export class ApiForbiddenException extends ApiExceptions {
  constructor() {
    super(ApiErrorCode.FORBIDDEN_EXCEPTION);
  }
}
