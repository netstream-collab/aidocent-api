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
exports.ChatAskToAiByVoiceDTO = exports.ChatAskToAiDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const codes_1 = require("../../constants/codes");
class ChatAskToAiDTO {
    constructor() {
        this.limit = 4;
        this.isRemind = 0;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { convoSessionId: { required: true, type: () => String }, question: { required: true, type: () => String }, length: { required: false, type: () => String }, resType: { required: false, type: () => String }, model: { required: false, type: () => String }, limit: { required: false, type: () => Number, default: 4 }, isRemind: { required: false, type: () => Number, default: 0 } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: '대화 세션 아이디', description: '', example: '' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatAskToAiDTO.prototype, "convoSessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: '질문 내용', description: 'ai에게 질문할 내용', example: '안녕?' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatAskToAiDTO.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        title: '답변길이',
        description: 'ai가 답변할 내용의 길이',
        example: 'long',
        enum: ['long', 'short', 'default'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChatAskToAiDTO.prototype, "length", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        title: '리턴 답변 타입',
        description: 'ai가 답변할 리턴 타입',
        example: 'text',
        enum: ['text', 'text-stream', 'tts'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChatAskToAiDTO.prototype, "resType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        title: 'LLM 모델 타입',
        description: 'AI로 사용할 LLM 종류',
        example: codes_1.default.LLMModels[0],
        enum: codes_1.default.LLMModels,
        default: codes_1.default.LLMModels[0],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ChatAskToAiDTO.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        title: '이전 대화 조회 개수',
        description: '이전 대회 조회 목록 개수',
        default: 4,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatAskToAiDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        title: '기억의존 여부',
        description: '0: 사용 안함, 1: 기억의존 사용',
        default: 0,
        enum: [0, 1],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatAskToAiDTO.prototype, "isRemind", void 0);
exports.ChatAskToAiDTO = ChatAskToAiDTO;
class ChatAskToAiByVoiceDTO extends (0, swagger_1.OmitType)(ChatAskToAiDTO, ['question']) {
    static _OPENAPI_METADATA_FACTORY() {
        return { questionVoice: { required: true, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: true }),
    __metadata("design:type", Object)
], ChatAskToAiByVoiceDTO.prototype, "questionVoice", void 0);
exports.ChatAskToAiByVoiceDTO = ChatAskToAiByVoiceDTO;
//# sourceMappingURL=chat-ask-to-ai.dto.js.map