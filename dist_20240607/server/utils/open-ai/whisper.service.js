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
exports.WhisperService = void 0;
const common_1 = require("@nestjs/common");
const restApi_util_1 = require("../common/restApi.util");
const FormData = require("form-data");
let WhisperService = class WhisperService {
    constructor() {
        this.logger = new common_1.Logger('Whisper');
        this.REST_KEY = process.env.OPENAI_API_KEY;
        this.model = 'whisper-1';
    }
    async transcriptions(file) {
        const formData = new FormData();
        formData.append('file', file.buffer, 'question.mp3');
        formData.append('model', this.model);
        const response = await restApi_util_1.default.request('POST', 'https://api.openai.com/v1/audio/transcriptions', formData, {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.REST_KEY}`,
        });
        this.logger.debug('response:', response);
        return response.text;
    }
};
WhisperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WhisperService);
exports.WhisperService = WhisperService;
//# sourceMappingURL=whisper.service.js.map