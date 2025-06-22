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
exports.ClovaCSRService = void 0;
const common_1 = require("@nestjs/common");
const restApi_util_1 = require("../common/restApi.util");
let ClovaCSRService = class ClovaCSRService {
    constructor() {
        this.RequestUrl = 'https://naveropenapi.apigw.ntruss.com/recog/v1/stt';
        this.ClientId = 'b3rk1949a6';
        this.ClientSecret = 'r93bceoK7Tr51ezSIcy1wjdvCuTktVXsQSX65yFo';
    }
    async stt(file) {
        const requestBody = {
            image: file.buffer,
        };
        const response = await restApi_util_1.default.request('POST', `${this.RequestUrl}?lang=Kor`, file.buffer, {
            'Content-Type': 'application/octet-stream',
            'X-NCP-APIGW-API-KEY-ID': this.ClientId,
            'X-NCP-APIGW-API-KEY': this.ClientSecret,
        });
        return response.text;
    }
};
ClovaCSRService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ClovaCSRService);
exports.ClovaCSRService = ClovaCSRService;
//# sourceMappingURL=clova-csr.service.js.map