"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const TB_CHAT_HIS_entity_1 = require("./entities/TB_CHAT_HIS.entity");
const TB_PROJ_entity_1 = require("./entities/TB_PROJ.entity");
const chatHis_dal_1 = require("./layers/chatHis.dal");
const proj_dal_1 = require("./layers/proj.dal");
const TB_MEMORY_entity_1 = require("./entities/TB_MEMORY.entity");
const memory_dal_1 = require("./layers/memory.dal");
const layers = [chatHis_dal_1.default, proj_dal_1.default, memory_dal_1.default];
let DalModule = class DalModule {
};
DalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([TB_PROJ_entity_1.TB_PROJ, TB_CHAT_HIS_entity_1.TB_CHAT_HIS, TB_MEMORY_entity_1.TB_MEMORY])],
        providers: [...layers],
        exports: [...layers],
    })
], DalModule);
exports.DalModule = DalModule;
//# sourceMappingURL=dal.module.js.map