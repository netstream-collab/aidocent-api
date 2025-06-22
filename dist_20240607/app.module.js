"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const view_module_1 = require("./view/view.module");
const aidocent_module_1 = require("./server/aidocent/aidocent.module");
const utils_module_1 = require("./server/utils/utils.module");
const catchException_1 = require("./server/constants/filter/catchException");
const core_1 = require("@nestjs/core");
const requestResponse_logger_1 = require("./server/constants/logger/requestResponse.logger");
const typeorm_1 = require("@nestjs/typeorm");
const db_config_1 = require("./server/config/db.config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(requestResponse_logger_1.RequestResponseLogger).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(db_config_1.DBConfig),
            view_module_1.ViewModule,
            aidocent_module_1.AidocentModule,
            utils_module_1.UtilsModule,
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: '/public/',
                rootPath: (0, path_1.join)(__dirname, '..', 'src', 'static'),
                serveStaticOptions: {
                    index: 'test-img.png',
                    fallthrough: true,
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: catchException_1.default,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map