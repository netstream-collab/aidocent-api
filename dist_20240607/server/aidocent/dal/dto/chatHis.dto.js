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
exports.IGptMessageFromChat = exports.IChatHis = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class IChatHis {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: false, type: () => Number }, projId: { required: true, type: () => Number }, uuid: { required: false, type: () => String }, convoSessionId: { required: true, type: () => String }, type: { required: true, type: () => String }, status: { required: true, type: () => String }, speakerRole: { required: true, type: () => String }, content: { required: true, type: () => String }, errorMsg: { required: false, type: () => String }, resType: { required: false, type: () => String }, createDate: { required: false, type: () => String, description: "Date ------------------------------------------------------------------" }, updateDate: { required: false, type: () => String }, deleteDate: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'nCHAT_ID' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], IChatHis.prototype, "chatId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'nPROJ_ID' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], IChatHis.prototype, "projId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sUUID' }),
    __metadata("design:type", String)
], IChatHis.prototype, "uuid", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'sCONVO_SESSION_ID' }),
    __metadata("design:type", String)
], IChatHis.prototype, "convoSessionId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'cTYPE' }),
    __metadata("design:type", String)
], IChatHis.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'cSTATUS' }),
    __metadata("design:type", String)
], IChatHis.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'cSPEAKER_ROLE' }),
    __metadata("design:type", String)
], IChatHis.prototype, "speakerRole", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'tCONTENT' }),
    __metadata("design:type", String)
], IChatHis.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'tERROR_MSG' }),
    __metadata("design:type", String)
], IChatHis.prototype, "errorMsg", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'cRES_TYPE' }),
    __metadata("design:type", String)
], IChatHis.prototype, "resType", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'dCREATE' }),
    __metadata("design:type", String)
], IChatHis.prototype, "createDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'dUPDATE' }),
    __metadata("design:type", String)
], IChatHis.prototype, "updateDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'dDELETE' }),
    __metadata("design:type", String)
], IChatHis.prototype, "deleteDate", void 0);
exports.IChatHis = IChatHis;
class IGptMessageFromChat {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: false, type: () => Number }, role: { required: true, type: () => Object }, content: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'nCHAT_ID' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], IGptMessageFromChat.prototype, "chatId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'cSPEAKER_ROLE' }),
    __metadata("design:type", String)
], IGptMessageFromChat.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'tCONTENT' }),
    __metadata("design:type", String)
], IGptMessageFromChat.prototype, "content", void 0);
exports.IGptMessageFromChat = IGptMessageFromChat;
//# sourceMappingURL=chatHis.dto.js.map