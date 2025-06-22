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
exports.ProjCreateDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProjCreateDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, code: { required: true, type: () => String, pattern: "/^[A-Za-z0-9-_]+$/g" }, description: { required: true, type: () => String }, userPrompt: { required: true, type: () => String }, memo: { required: true, type: () => String }, tags: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: '프로젝트 이름', example: '신규 프로젝트' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjCreateDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: '프로젝트 코드', description: '영어,숫자,기호만 가능', example: 'sample' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9-_]+$/g),
    __metadata("design:type", String)
], ProjCreateDTO.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: '프로젝트 설명', example: '신규 아이템 전시 프로젝트' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjCreateDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: '사용자 프롬포트', example: '친구에게 말하듯이 친근하게 대답해.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjCreateDTO.prototype, "userPrompt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: '메모', example: '' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjCreateDTO.prototype, "memo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: '프로젝트 태그', description: '쉼표로 구분하는 키워드 문자열', example: '넷스트림,상현태,chatRPG' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjCreateDTO.prototype, "tags", void 0);
exports.ProjCreateDTO = ProjCreateDTO;
//# sourceMappingURL=proj-create.dto.js.map