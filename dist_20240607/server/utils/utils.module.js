"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsModule = void 0;
const common_1 = require("@nestjs/common");
const clova_module_1 = require("./clova/clova.module");
const open_ai_module_1 = require("./open-ai/open-ai.module");
const etri_module_1 = require("./etri/etri.module");
const google_module_1 = require("./google/google.module");
let UtilsModule = class UtilsModule {
};
UtilsModule = __decorate([
    (0, common_1.Module)({
        imports: [open_ai_module_1.OpenAiModule, clova_module_1.ClovaModule, etri_module_1.EtriModule, google_module_1.GoogleModule],
        exports: [open_ai_module_1.OpenAiModule, clova_module_1.ClovaModule, etri_module_1.EtriModule, google_module_1.GoogleModule],
        providers: [],
    })
], UtilsModule);
exports.UtilsModule = UtilsModule;
//# sourceMappingURL=utils.module.js.map