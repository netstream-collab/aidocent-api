"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const rTracer = require("cls-rtracer");
const path_1 = require("path");
const swagger_util_1 = require("./server/utils/swagger/swagger.util");
const cors_config_1 = require("./server/config/cors.config");
const CustomLogger_1 = require("./server/constants/logger/CustomLogger");
const CommonLogger_1 = require("./server/constants/logger/CommonLogger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
        bodyParser: true,
        logger: new CustomLogger_1.CustomLogger(),
    });
    app.enableCors(cors_config_1.CorsConfig.option);
    app.use(cookieParser(process.env.JWT_SECRET));
    app.use(rTracer.expressMiddleware());
    app.use(session({
        secret: process.env.SESSION_SECRET || 'a',
        resave: true,
        saveUninitialized: false,
        name: '',
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'src', 'view'));
    app.setViewEngine('ejs');
    swagger_util_1.SwaggerUtil.security(app, {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PWD,
    });
    swagger_util_1.SwaggerUtil.init(app);
    const AppPort = +process.env.PORT || 4000;
    await app.listen(AppPort, () => {
        if (['prod'].includes(process.env.NODE_ENV)) {
            process.send('ready');
        }
        CommonLogger_1.default.name('BOOT').info(`Listening on ${AppPort} port! 🚀`);
        CommonLogger_1.default.name('BOOT').info(`NODE_ENV     : ${process.env.NODE_ENV}`);
        CommonLogger_1.default.name('BOOT').info(`DEBUG_MODE   : ${process.env.DEBUG}`);
        CommonLogger_1.default.name('BOOT').info(`CORS_ORIGINS : ${cors_config_1.CorsConfig.origin.toLocaleString()}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map