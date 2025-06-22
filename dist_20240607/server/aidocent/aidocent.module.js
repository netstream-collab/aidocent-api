"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AidocentModule = void 0;
const common_1 = require("@nestjs/common");
const dal_module_1 = require("./dal/dal.module");
const aidocent_controller_1 = require("./aidocent.controller");
const aidocent_service_1 = require("./aidocent.service");
const utils_module_1 = require("../utils/utils.module");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth/auth.module");
let AidocentModule = class AidocentModule {
};
AidocentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            dal_module_1.DalModule,
            utils_module_1.UtilsModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),
            auth_module_1.AuthModule,
        ],
        controllers: [aidocent_controller_1.AidocentController],
        providers: [aidocent_service_1.AidocentService],
    })
], AidocentModule);
exports.AidocentModule = AidocentModule;
//# sourceMappingURL=aidocent.module.js.map