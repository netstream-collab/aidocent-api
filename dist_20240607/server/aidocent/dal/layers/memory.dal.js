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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const TB_MEMORY_entity_1 = require("../entities/TB_MEMORY.entity");
const typeorm_2 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const memory_dto_1 = require("../dto/memory.dto");
const date_util_1 = require("../../../utils/common/date.util");
let MemoryDal = class MemoryDal {
    constructor(memoryRepository) {
        this.memoryRepository = memoryRepository;
    }
    async findByConviSessionId(convoSessionId) {
        const result = await this.memoryRepository.find({
            where: {
                sCONVO_SESSION_ID: convoSessionId,
            },
            order: {
                nMEMORY_ID: 'desc',
            },
        });
        return this.convertResult(result);
    }
    async create(memoryOpt) {
        const now = (0, date_util_1.getNow)();
        const result = await this.memoryRepository.save({
            sCONVO_SESSION_ID: memoryOpt.convoSessionId,
            tCONTENT: memoryOpt.content,
            nLAST_CHAT_ID: memoryOpt.lastChatId,
            dCREATE: now,
        });
        return this.convertResult(result);
    }
    convertResult(result) {
        return (0, class_transformer_1.plainToInstance)(memory_dto_1.IMemory, result, {
            excludeExtraneousValues: true,
        });
    }
};
MemoryDal = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(TB_MEMORY_entity_1.TB_MEMORY)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MemoryDal);
exports.default = MemoryDal;
//# sourceMappingURL=memory.dal.js.map