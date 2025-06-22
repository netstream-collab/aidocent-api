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
exports.TB_PROJ = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let TB_PROJ = class TB_PROJ {
    static _OPENAPI_METADATA_FACTORY() {
        return { nPROJ_ID: { required: true, type: () => Number }, sUUID: { required: true, type: () => String }, sPROJ_CODE: { required: true, type: () => String }, cSTATUS: { required: true, type: () => String }, sNAME: { required: true, type: () => String }, sDESCRIPTION: { required: true, type: () => String }, tUSER_PROMPT: { required: true, type: () => String }, tMEMO: { required: true, type: () => String }, sREST_API_KEY: { required: true, type: () => String }, sTAGS: { required: true, type: () => String }, dCREATE: { required: true, type: () => String }, dUPDATE: { required: true, type: () => String }, dDELETE: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TB_PROJ.prototype, "nPROJ_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "sUUID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "sPROJ_CODE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "cSTATUS", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "sNAME", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "sDESCRIPTION", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "tUSER_PROMPT", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "tMEMO", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "sREST_API_KEY", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "sTAGS", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "dCREATE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "dUPDATE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_PROJ.prototype, "dDELETE", void 0);
TB_PROJ = __decorate([
    (0, typeorm_1.Entity)('TB_PROJ')
], TB_PROJ);
exports.TB_PROJ = TB_PROJ;
//# sourceMappingURL=TB_PROJ.entity.js.map