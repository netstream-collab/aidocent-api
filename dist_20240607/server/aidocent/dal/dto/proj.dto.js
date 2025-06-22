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
exports.IProj = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class IProj {
    static _OPENAPI_METADATA_FACTORY() {
        return { projId: { required: false, type: () => Number }, uuid: { required: false, type: () => String }, projCode: { required: true, type: () => String }, status: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, userPrompt: { required: false, type: () => String }, memo: { required: false, type: () => String }, restApiKey: { required: false, type: () => String }, tags: { required: false, type: () => String, description: "\uC27C\uD45C\uB85C \uAD6C\uBD84\uD558\uB294 \uBB38\uC790\uC5F4" }, createDate: { required: false, type: () => String, description: "Date ------------------------------------------------------------------" }, updateDate: { required: false, type: () => String }, deleteDate: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'nPROJ_ID' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], IProj.prototype, "projId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sUUID' }),
    __metadata("design:type", String)
], IProj.prototype, "uuid", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sPROJ_CODE' }),
    __metadata("design:type", String)
], IProj.prototype, "projCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'cSTATUS' }),
    __metadata("design:type", String)
], IProj.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sNAME' }),
    __metadata("design:type", String)
], IProj.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sDESCRIPTION' }),
    __metadata("design:type", String)
], IProj.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'tUSER_PROMPT' }),
    __metadata("design:type", String)
], IProj.prototype, "userPrompt", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'tMEMO' }),
    __metadata("design:type", String)
], IProj.prototype, "memo", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sREST_API_KEY' }),
    __metadata("design:type", String)
], IProj.prototype, "restApiKey", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sTAGS' }),
    (0, class_transformer_1.Transform)(({ value }) => value || '', { toClassOnly: true }),
    __metadata("design:type", String)
], IProj.prototype, "tags", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'dCREATE' }),
    __metadata("design:type", String)
], IProj.prototype, "createDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'dUPDATE' }),
    __metadata("design:type", String)
], IProj.prototype, "updateDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'dDELETE' }),
    __metadata("design:type", String)
], IProj.prototype, "deleteDate", void 0);
exports.IProj = IProj;
//# sourceMappingURL=proj.dto.js.map