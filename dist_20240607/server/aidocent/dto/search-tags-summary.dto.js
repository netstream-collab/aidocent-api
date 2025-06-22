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
exports.SearchTagsSummaryDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SearchTagsSummaryDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { tags: { required: true, type: () => [String] }, resType: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: '프로젝트 이름', example: ['netstream', '넷스트림', '어바운드리', '성수팝업'] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SearchTagsSummaryDTO.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        title: '답변 타입',
        description: 'ai가 답변할 리턴 타입',
        example: 'text',
        enum: ['text', 'text-stream', 'tts'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchTagsSummaryDTO.prototype, "resType", void 0);
exports.SearchTagsSummaryDTO = SearchTagsSummaryDTO;
//# sourceMappingURL=search-tags-summary.dto.js.map