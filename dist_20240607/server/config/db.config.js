"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfig = void 0;
const CommonLogger_1 = require("../constants/logger/CommonLogger");
const typeormLogger_1 = require("../constants/logger/typeormLogger");
exports.DBConfig = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    name: 'default',
    logger: new typeormLogger_1.default(),
    timezone: process.env.DB_TIMEZONE,
    autoLoadEntities: true,
};
CommonLogger_1.default.name('RDB').info('Request RDB Connect...');
CommonLogger_1.default.name('RDB').info(`host: ${exports.DBConfig.host}`);
CommonLogger_1.default.name('RDB').info(`port: ${exports.DBConfig.port}`);
CommonLogger_1.default.name('RDB').info(`database: ${exports.DBConfig.database}`);
CommonLogger_1.default.name('RDB').info(`timezone: ${exports.DBConfig.timezone}`);
//# sourceMappingURL=db.config.js.map