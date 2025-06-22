"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtriService = void 0;
const common_1 = require("@nestjs/common");
const restApi_util_1 = require("../common/restApi.util");
let EtriService = class EtriService {
    constructor() {
        this.API_KEY = process.env.ETRI_API_KEY;
    }
    async stt(fileBuffer, languageCode) {
        const response = await restApi_util_1.default.request('POST', 'http://aiopen.etri.re.kr:8000/WiseASR/Recognition', {
            argument: {
                language_code: languageCode || 'korean',
                audio: fileBuffer.toString('base64'),
            },
        }, {
            Authorization: this.API_KEY,
        });
        return response;
    }
};
EtriService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EtriService);
exports.EtriService = EtriService;
//# sourceMappingURL=etri.service.js.map