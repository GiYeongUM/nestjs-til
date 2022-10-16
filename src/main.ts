import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpApiExceptionFilter } from './common/exceptions/api-exception.filter';
import { TErrorCode } from './common/define/api-error-code';
import { SocketIoAdapter } from './adapters/socket-io.adapters';
import { join } from 'path';
import { IoAdapter } from "@nestjs/platform-socket.io";

class Application {
  private logger = new Logger(Application.name);
  private readonly PORT: string;

  constructor(private readonly server: NestExpressApplication) {
    this.server = server;
    this.PORT = process.env.PORT || '3000';
  }

  private initOpenApi() {
    SwaggerModule.setup(
        'api-docs',
        this.server,
        SwaggerModule.createDocument(
            this.server,
            new DocumentBuilder()
                .setTitle('LG CNS Media pole 프로젝트')
                .setDescription('API 문서')
                .setVersion('0.1.0')
                .addBearerAuth()
                .build(),
        ),
        {
          swaggerOptions: {
            persistAuthorization: true,
          },
        },
    );
  }
  private initGlobalMiddleware() {
    this.server.enableCors();
    this.initOpenApi();

    this.server.useGlobalPipes(
        new ValidationPipe({
          skipMissingProperties: false,
          transform: true,
          disableErrorMessages: true,
          exceptionFactory: (validationErrors: ValidationError[] = []) => {
            const errorCode: TErrorCode = {
              statusCode: 400,
              message:
                  Object.values(validationErrors[0].constraints)[0] ||
                  'bad request',
            };
            return new BadRequestException(errorCode);
          },
        }),
    );

    this.server.useGlobalInterceptors(
        new ClassSerializerInterceptor(this.server.get(Reflector)),
    );
    this.server.useGlobalInterceptors(new TransformInterceptor());
    this.server.useGlobalFilters(new HttpApiExceptionFilter());
  }

  async bootstrap() {
    this.server.setGlobalPrefix('api');
    await this.initGlobalMiddleware();
    await this.server.listen(this.PORT);
  }

  async setWebSocket(app: Application){
    this.server.useWebSocketAdapter(new IoAdapter(app))
    this.server.useStaticAssets(join(__dirname, '..', 'public'));
    this.server.setBaseViewsDir(join(__dirname, '..', 'views'));
    this.server.setViewEngine('ejs');
  }

  startLog() {
    this.logger.log(`Server on http://localhost:${this.PORT}, ${new Date()}`);
  }
}

async function init() {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);
  await app.bootstrap();
  await app.setWebSocket(app);
  app.startLog();
}
init().catch((error) => {
  new Logger('init').error(error);
});
