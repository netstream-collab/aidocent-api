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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const chatHis_dal_1 = require("../dal/layers/chatHis.dal");
const proj_dal_1 = require("../dal/layers/proj.dal");
const text_util_1 = require("../../utils/common/text.util");
const codes_1 = require("../../constants/codes");
let AuthService = class AuthService {
    constructor(projDAL, chatHisDAL) {
        this.projDAL = projDAL;
        this.chatHisDAL = chatHisDAL;
    }
    async validateRestApiKey(restApiKey) {
        const project = await this.projDAL.findOneByRestApiKey(restApiKey);
        if ((0, text_util_1.isEmpty)(project)) {
            throw new Error('none project');
        }
        else if (project.status !== codes_1.default.ProjectStatus.VALID) {
            throw new Error('invalid project');
        }
        return project;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [proj_dal_1.default, chatHis_dal_1.default])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map