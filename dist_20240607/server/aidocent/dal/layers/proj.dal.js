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
var ProjDAL_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const dbRawData_util_1 = require("../../../utils/common/dbRawData.util");
const date_util_1 = require("../../../utils/common/date.util");
const text_util_1 = require("../../../utils/common/text.util");
const object_util_1 = require("../../../utils/common/object.util");
const TB_PROJ_entity_1 = require("../entities/TB_PROJ.entity");
const proj_dto_1 = require("../dto/proj.dto");
const codes_1 = require("../../../constants/codes");
let ProjDAL = ProjDAL_1 = class ProjDAL {
    constructor(connection, projRepo) {
        this.connection = connection;
        this.projRepo = projRepo;
        this.logger = new common_1.Logger(ProjDAL_1.name);
    }
    setRepository(_m) {
        this.projRepo = _m.getRepository(TB_PROJ_entity_1.TB_PROJ);
    }
    resetRepository() {
        this.projRepo = this.connection.getRepository(TB_PROJ_entity_1.TB_PROJ);
    }
    convertResult(result) {
        return (0, class_transformer_1.plainToInstance)(proj_dto_1.IProj, result, {
            excludeExtraneousValues: true,
        });
    }
    async sample() {
        const man = this.projRepo.manager;
        const sql = ``;
        const param = {};
        const [q, p] = man.connection.driver.escapeQueryWithParameters(sql, param, {});
        const result = (0, dbRawData_util_1.setDotProps)(await man.query(q, p));
        return result;
    }
    async create(createOpt) {
        const nowDate = (0, date_util_1.getNow)();
        const result = await this.projRepo.save({
            sUUID: (0, text_util_1.createUUID)(),
            sPROJ_CODE: createOpt.projCode,
            sNAME: createOpt.name,
            sDESCRIPTION: createOpt.description,
            cSTATUS: createOpt.status,
            tUSER_PROMPT: createOpt.userPrompt,
            tMEMO: createOpt.memo,
            sREST_API_KEY: '',
            dCREATE: nowDate,
            dUPDATE: nowDate,
        });
        return this.convertResult(result);
    }
    async findOne(projId) {
        const result = this.projRepo.findOne({
            where: {
                nPROJ_ID: projId,
            },
        });
        return this.convertResult(result);
    }
    async findOneByRestApiKey(restApiKey) {
        const result = this.projRepo.findOne({
            where: {
                sREST_API_KEY: restApiKey,
            },
        });
        return this.convertResult(result);
    }
    async validate(projId) {
        if (!projId) {
            throw new Error('none project');
        }
        const project = await this.findOne(projId);
        if ((0, text_util_1.isEmpty)(project)) {
            throw new Error('none project');
        }
        else if (project.status !== codes_1.default.ProjectStatus.VALID) {
            throw new Error('invalid project');
        }
        return project;
    }
    async findAll() {
        const result = await this.projRepo.find();
        return this.convertResult(result);
    }
    async update(projId, updateOpt) {
        const updateCondition = (0, object_util_1.jsonToPlain)(proj_dto_1.IProj, updateOpt);
        if (!(0, text_util_1.isEmpty)(updateOpt) && !(0, text_util_1.isEmpty)(updateCondition)) {
            await this.projRepo.update({
                nPROJ_ID: projId,
            }, Object.assign(Object.assign({}, updateCondition), { dUPDATE: (0, date_util_1.getNow)() }));
        }
        return await this.findOne(projId);
    }
    async updateRestApiKey(projId, restApiKey) {
        const result = await this.projRepo.update({
            nPROJ_ID: projId,
        }, {
            sREST_API_KEY: restApiKey,
        });
        return result.affected;
    }
};
ProjDAL = ProjDAL_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __param(1, (0, typeorm_1.InjectRepository)(TB_PROJ_entity_1.TB_PROJ)),
    __metadata("design:paramtypes", [typeorm_2.Connection, typeorm_2.Repository])
], ProjDAL);
exports.default = ProjDAL;
//# sourceMappingURL=proj.dal.js.map