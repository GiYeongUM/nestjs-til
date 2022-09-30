import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger(LoggerMiddleware.name);
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent: string = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      this.logger.log(`
        ${method} ${url} ${statusCode} - ${userAgent} ${ip}`);
    });
    next();
  }
}
