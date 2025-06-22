"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClovaModule = void 0;
const common_1 = require("@nestjs/common");
const clova_voice_service_1 = require("./clova-voice.service");
const clova_studio_service_1 = require("./clova-studio.service");
const clova_csr_service_1 = require("./clova-csr.service");
let ClovaModule = class ClovaModule {
};
ClovaModule = __decorate([
    (0, common_1.Module)({
        providers: [clova_voice_service_1.ClovaVoiceService, clova_studio_service_1.ClovaStudioService, clova_csr_service_1.ClovaCSRService],
        exports: [clova_voice_service_1.ClovaVoiceService, clova_studio_service_1.ClovaStudioService, clova_csr_service_1.ClovaCSRService],
    })
], ClovaModule);
exports.ClovaModule = ClovaModule;
//# sourceMappingURL=clova.module.js.map