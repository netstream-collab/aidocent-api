import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import _l from '../constants/logger/CommonLogger';
import TypeormLogger from '../constants/logger/typeormLogger';

export const DBConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  name: 'default',
  logger: new TypeormLogger(),
  timezone: process.env.DB_TIMEZONE,
  autoLoadEntities: true,
};

_l.name('RDB').info('Request RDB Connect...');
_l.name('RDB').info(`host: ${DBConfig.host}`);
_l.name('RDB').info(`port: ${DBConfig.port}`);
_l.name('RDB').info(`database: ${DBConfig.database}`);
_l.name('RDB').info(`timezone: ${DBConfig.timezone}`);
