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
exports.TB_MEMORY = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let TB_MEMORY = class TB_MEMORY {
    static _OPENAPI_METADATA_FACTORY() {
        return { nMEMORY_ID: { required: true, type: () => Number }, sCONVO_SESSION_ID: { required: true, type: () => String }, nLAST_CHAT_ID: { required: true, type: () => Number }, tCONTENT: { required: true, type: () => String }, dCREATE: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TB_MEMORY.prototype, "nMEMORY_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_MEMORY.prototype, "sCONVO_SESSION_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TB_MEMORY.prototype, "nLAST_CHAT_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_MEMORY.prototype, "tCONTENT", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TB_MEMORY.prototype, "dCREATE", void 0);
TB_MEMORY = __decorate([
    (0, typeorm_1.Entity)('TB_MEMORY')
], TB_MEMORY);
exports.TB_MEMORY = TB_MEMORY;
//# sourceMappingURL=TB_MEMORY.entity.js.map