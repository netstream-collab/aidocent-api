import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewModule } from './view/view.module';
import { AidocentModule } from './server/aidocent/aidocent.module';
import { UtilsModule } from './server/utils/utils.module';
import CatchExceptionFilter from './server/constants/filter/catchException';
import { APP_FILTER } from '@nestjs/core';
import { RequestResponseLogger } from './server/constants/logger/requestResponse.logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './server/config/db.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(DBConfig),
    ViewModule,
    AidocentModule,
    UtilsModule,
    ServeStaticModule.forRoot({
      serveRoot: '/public/',
      rootPath: join(__dirname, '..', 'src', 'static'),
      serveStaticOptions: {
        index: 'test-img.png',
        fallthrough: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CatchExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestResponseLogger).forRoutes('*');
  }
}
