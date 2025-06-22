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
exports.ApiResponseTemplate = void 0;
const swagger_1 = require("@nestjs/swagger");
class ApiResponseTemplate {
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'http statua code', example: 200 }),
    __metadata("design:type", Number)
], ApiResponseTemplate.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: '결과 코드값', example: '00' }),
    __metadata("design:type", String)
], ApiResponseTemplate.prototype, "resultCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: '결과 메시지', example: 'Success to create project' }),
    __metadata("design:type", String)
], ApiResponseTemplate.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: '결과 데이터', example: {} }),
    __metadata("design:type", Object)
], ApiResponseTemplate.prototype, "data", void 0);
exports.ApiResponseTemplate = ApiResponseTemplate;
//# sourceMappingURL=api-response-template.type.js.map