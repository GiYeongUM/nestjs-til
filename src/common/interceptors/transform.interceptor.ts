import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';

export class CommonResponse<T> {
  data: T;
  @ApiProperty({ type: Number })
  statusCode: number;
  @ApiProperty({ type: String })
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, CommonResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<CommonResponse<T>> {
    // const ctx = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: context.switchToHttp().getResponse<Response>().statusCode,
        message: 'success',
      })),
    );
  }
}
