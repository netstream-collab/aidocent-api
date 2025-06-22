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
var ChatHisDAL_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const TB_CHAT_HIS_entity_1 = require("../entities/TB_CHAT_HIS.entity");
const chatHis_dto_1 = require("../dto/chatHis.dto");
const dbRawData_util_1 = require("../../../utils/common/dbRawData.util");
const date_util_1 = require("../../../utils/common/date.util");
const text_util_1 = require("../../../utils/common/text.util");
const object_util_1 = require("../../../utils/common/object.util");
let ChatHisDAL = ChatHisDAL_1 = class ChatHisDAL {
    constructor(connection, chatHisRepo) {
        this.connection = connection;
        this.chatHisRepo = chatHisRepo;
        this.logger = new common_1.Logger(ChatHisDAL_1.name);
    }
    setRepository(_m) {
        this.chatHisRepo = _m.getRepository(TB_CHAT_HIS_entity_1.TB_CHAT_HIS);
    }
    resetRepository() {
        this.chatHisRepo = this.connection.getRepository(TB_CHAT_HIS_entity_1.TB_CHAT_HIS);
    }
    convertResult(result) {
        return (0, class_transformer_1.plainToInstance)(chatHis_dto_1.IChatHis, result, {
            excludeExtraneousValues: true,
        });
    }
    async sample() {
        const man = this.chatHisRepo.manager;
        const sql = ``;
        const param = {};
        const [q, p] = man.connection.driver.escapeQueryWithParameters(sql, param, {});
        const result = (0, dbRawData_util_1.setDotProps)(await man.query(q, p));
        return result;
    }
    async create(createOpt) {
        const nowDate = (0, date_util_1.getNow)();
        const result = await this.chatHisRepo.save({
            nPROJ_ID: createOpt.projId,
            sUUID: (0, text_util_1.createUUID)(),
            sCONVO_SESSION_ID: createOpt.convoSessionId,
            cTYPE: createOpt.type,
            cSTATUS: createOpt.status,
            cSPEAKER_ROLE: createOpt.speakerRole,
            tCONTENT: createOpt.content,
            tERROR_MSG: createOpt.errorMsg || '',
            cRES_TYPE: createOpt.resType || '',
            dCREATE: nowDate,
            dUPDATE: nowDate,
        });
        return this.convertResult(result);
    }
    async bulkCreate(createOpts) {
        const nowDate = (0, date_util_1.getNow)();
        const values = createOpts === null || createOpts === void 0 ? void 0 : createOpts.map((json) => (0, object_util_1.jsonToPlain)(chatHis_dto_1.IChatHis, Object.assign(Object.assign({}, json), { createDate: nowDate, updateDate: nowDate })));
        this.logger.log('values: ', values);
        await this.chatHisRepo.createQueryBuilder().insert().into(TB_CHAT_HIS_entity_1.TB_CHAT_HIS).values(values).execute();
    }
    async findByConviSessionId(convoSessionId, limit = 10) {
        const result = await this.chatHisRepo.find({
            where: {
                sCONVO_SESSION_ID: convoSessionId,
            },
            order: {
                nCHAT_ID: 'DESC',
            },
            take: limit,
        });
        return this.convertResult(result) || [];
    }
    async findByConviSessionIdForGpt(projId, convoSessionId, limit = 10) {
        const result = await this.chatHisRepo.find({
            where: {
                nPROJ_ID: projId,
                sCONVO_SESSION_ID: convoSessionId,
            },
            order: {
                nCHAT_ID: 'DESC',
            },
            take: limit,
        });
        return (0, class_transformer_1.plainToInstance)(chatHis_dto_1.IGptMessageFromChat, result, {
            excludeExtraneousValues: true,
        });
    }
    async findAllConvoSessionIdOfProject(projId) {
        const result = await this.chatHisRepo
            .createQueryBuilder('chatHis')
            .select('*')
            .where('chatHis.nPROJ_ID = :projId', {
            projId: projId,
        })
            .orderBy('chatHis.nCHAT_ID', 'DESC')
            .groupBy('chatHis.sCONVO_SESSION_ID')
            .getRawMany();
        return this.convertResult(result);
    }
};
ChatHisDAL = ChatHisDAL_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __param(1, (0, typeorm_1.InjectRepository)(TB_CHAT_HIS_entity_1.TB_CHAT_HIS)),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        typeorm_2.Repository])
], ChatHisDAL);
exports.default = ChatHisDAL;
//# sourceMappingURL=chatHis.dal.js.map