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
exports.TB_CHAT_HIS = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let TB_CHAT_HIS = class TB_CHAT_HIS {
    static _OPENAPI_METADATA_FACTORY() {
        return { nCHAT_ID: { required: true, type: () => Number }, nPROJ_ID: { required: true, type: () => Number }, sUUID: { required: true, type: () => String }, sCONVO_SESSION_ID: { required: true, type: () => String }, cTYPE: { required: true, type: () => String }, cSTATUS: { required: true, type: () => String }, cSPEAKER_ROLE: { required: true, type: () => String }, tCONTENT: { required: true, type: () => String }, tERROR_MSG: { required: true, type: () => String }, cRES_TYPE: { required: true, type: () => String }, dCREATE: { required: true, type: () => String }, dUPDATE: { required: true, type: () => String }, dDELETE: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TB_CHAT_HIS.prototype, "nCHAT_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TB_CHAT_HIS.prototype, "nPROJ_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "sUUID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "sCONVO_SESSION_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "cTYPE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "cSTATUS", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "cSPEAKER_ROLE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "tCONTENT", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "tERROR_MSG", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "cRES_TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "dCREATE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "dUPDATE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_CHAT_HIS.prototype, "dDELETE", void 0);
TB_CHAT_HIS = __decorate([
    (0, typeorm_1.Entity)('TB_CHAT_HIS')
], TB_CHAT_HIS);
exports.TB_CHAT_HIS = TB_CHAT_HIS;
//# sourceMappingURL=TB_CHAT_HIS.entity.js.map