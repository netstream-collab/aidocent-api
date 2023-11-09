import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as rTracer from 'cls-rtracer';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerUtil } from './server/utils/swagger/swagger.util';
import { CorsConfig } from './server/config/cors.config';
import { CustomLogger } from './server/constants/logger/CustomLogger';
import _l from './server/constants/logger/CommonLogger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    bodyParser: true,
    logger: new CustomLogger(),
  });

  // set cors
  app.enableCors(CorsConfig.option);

  app.use(cookieParser(process.env.JWT_SECRET));

  app.use(rTracer.expressMiddleware());

  // set session
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'a',
      resave: true,
      saveUninitialized: false,
      name: '',
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 정의한 값만 받기, 정의 안한 값이면 오류
      forbidNonWhitelisted: true,
      transform: true, // request 자동 형변환
      // exceptionFactory: validationExceptionFactory, // 커스텀 정의한 에러
    }),
  );

  // set view
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'view'));
  app.setViewEngine('ejs');

  SwaggerUtil.security(app, {
    [process.env.SWAGGER_USER]: process.env.SWAGGER_PWD,
  });
  SwaggerUtil.init(app);

  const AppPort = +process.env.PORT || 4000;
  await app.listen(AppPort, () => {
//    if (['dev', 'qa', 'prod'].includes(process.env.NODE_ENV)) {
//      process.send('ready');
//    }
    _l.name('BOOT').info(`Listening on ${AppPort} port! 🚀`);
    _l.name('BOOT').info(`NODE_ENV     : ${process.env.NODE_ENV}`);
    _l.name('BOOT').info(`DEBUG_MODE   : ${process.env.DEBUG}`);
    _l.name('BOOT').info(`CORS_ORIGINS : ${CorsConfig.origin.toLocaleString()}`);
  });
}
bootstrap();
