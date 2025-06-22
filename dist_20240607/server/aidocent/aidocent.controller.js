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
exports.AidocentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const aidocent_service_1 = require("./aidocent.service");
const chat_ask_to_ai_dto_1 = require("./dto/chat-ask-to-ai.dto");
const proj_create_dto_1 = require("./dto/proj-create.dto");
const restApiKey_guard_1 = require("./auth/guard/restApiKey.guard");
const projcet_decorator_1 = require("./auth/decorator/projcet.decorator");
const proj_update_dto_1 = require("./dto/proj-update.dto");
const api_response_type_1 = require("../utils/swagger/schemas/api-response.type");
const platform_express_1 = require("@nestjs/platform-express");
const search_tags_summary_dto_1 = require("./dto/search-tags-summary.dto");
let AidocentController = class AidocentController {
    constructor(aidocentService) {
        this.aidocentService = aidocentService;
    }
    searchTest() {
        return this.aidocentService.searchTest();
    }
    getAllProject() {
        return this.aidocentService.getAllProject();
    }
    createNewProject(body) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>AI DOCNT 연결 됐슈 !!!!!!!!!!!!!!!<<<<<<<<<<<<<<<<');
        return this.aidocentService.createNewProject(body);
    }
    getOneProjectInfo(projId) {
        return this.aidocentService.getOneProjectInfo(projId);
    }
    updateProjectInfo(projId, body) {
        return this.aidocentService.updateProjectInfo(projId, body);
    }
    deleteOneProject(projId) {
        return this.aidocentService.deleteOneProject(projId);
    }
    renewRestApiKeyOfProject(projId) {
        return this.aidocentService.renewRestApiKeyOfProject(projId);
    }
    getAllConvoOfProject(projId) {
        return this.aidocentService.getAllConvoOfProject(projId);
    }
    getAllChatsOfConvoSession(convoSessionId) {
        return this.aidocentService.getAllChatsOfConvoSession(convoSessionId);
    }
    searchTagsSummary(response, body) {
        return this.aidocentService.searchTagsSummary(response, body);
    }
    async getProjectInfoByRestApiKey(project) {
        return this.aidocentService.getProjectInfoByRestApiKey(project);
    }
    startNewConversation(response, projId) {
        return this.aidocentService.startNewConversation(response, projId);
    }
    askToAiWithProject(res, body, project) {
        return this.aidocentService.askToAiWithProject(project, body);
    }
    askToAiWithProjectByStreaming(res, body, project) {
        return this.aidocentService.askToAiWithProjectByStreaming(res, project, body);
    }
    askToAiWithProjectReturnTTS(res, body, project) {
        return this.aidocentService.askToAiWithProjectReturnTTS(res, project, body);
    }
    askToAiWithProjectByVoice(res, body, project, questionVoiceFile) {
        return this.aidocentService.askToAiWithProjectByVoice(res, project, body, questionVoiceFile);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: "--- Project ---------------------------------------------", summary: '정보 검색' }),
    (0, common_1.Get)('/search/test'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "searchTest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "--- Project ---------------------------------------------", summary: '모든 프로젝트 정보 가져오기' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_type_1.ApiGetProjAllRes }),
    (0, common_1.Get)('/proj/all'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "getAllProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '신규 프로젝트 생성' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료', type: api_response_type_1.ApiPostProjNewRes }),
    (0, common_1.Post)('/proj/new'),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [proj_create_dto_1.ProjCreateDTO]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "createNewProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 프로젝트 정보 가져오기' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료', type: api_response_type_1.ApiGetProjInfo }),
    (0, common_1.Get)('/proj/:projId/info'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('projId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "getOneProjectInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 프로젝트의 정보 수정하기' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료', type: api_response_type_1.ApiPatchProjInfo }),
    (0, common_1.Patch)('/proj/:projId/info'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('projId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, proj_update_dto_1.ProjUpdateDTO]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "updateProjectInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 프로젝트 삭제하기' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료', type: api_response_type_1.ApiDeleteProjInfo }),
    (0, common_1.Post)('/proj/:projId/del'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('projId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "deleteOneProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 프로젝트의 rest-api-key 갱신하기' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료', type: api_response_type_1.ApiPostProjRenewRestApiKey }),
    (0, common_1.Post)('/proj/:projId/renew/rest-api-key'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('projId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "renewRestApiKeyOfProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 프로젝트의 대화 내역 리스트 가져오기' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료', type: api_response_type_1.ApiGetProjConvoList }),
    (0, common_1.Get)('/proj/:projId/convo'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('projId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "getAllConvoOfProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'convo session에 속한 모든 챗 정보 가져오기' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료', type: api_response_type_1.ApiGetProjConvoChat }),
    (0, common_1.Get)('/proj/convo/chat/:convoSessionId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('convoSessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "getAllChatsOfConvoSession", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "--- AIdocnet Rest Api ---------------------------------------------", summary: '태그 기반 정보 검색후 요약' }),
    (0, swagger_1.ApiBearerAuth)('aidocent-rest-api-key'),
    (0, common_1.Post)('/search/tags/summary'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Response)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, search_tags_summary_dto_1.SearchTagsSummaryDTO]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "searchTagsSummary", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('aidocent-rest-api-key'),
    (0, swagger_1.ApiOperation)({ summary: 'rest api key를 통해 프로젝트 정보 가져오기', description: '' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_type_1.ApiGetProjAllRes }),
    (0, common_1.Get)('/aid/proj/info'),
    (0, common_1.UseGuards)(restApiKey_guard_1.RestApiKeyGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, projcet_decorator_1.Project)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AidocentController.prototype, "getProjectInfoByRestApiKey", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('aidocent-rest-api-key'),
    (0, swagger_1.ApiOperation)({ summary: '신규 대화 세션값 생성하기' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료', type: api_response_type_1.ApiPostAidChatNewConvo }),
    (0, common_1.Post)('/aid/chat/new/convo'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(restApiKey_guard_1.RestApiKeyGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, projcet_decorator_1.Project)('projId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "startNewConversation", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('aidocent-rest-api-key'),
    (0, swagger_1.ApiOperation)({ summary: '프로젝트 기반으로 ai에게 질문하기 / 리턴타입: 텍스트' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료', type: api_response_type_1.ApiPostAidChatAskText }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/aid/chat/ask'),
    (0, common_1.UseGuards)(restApiKey_guard_1.RestApiKeyGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, projcet_decorator_1.Project)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_ask_to_ai_dto_1.ChatAskToAiDTO, Object]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "askToAiWithProject", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('aidocent-rest-api-key'),
    (0, swagger_1.ApiOperation)({ summary: '프로젝트 기반으로 ai에게 질문하기  / 리턴타입: 텍스트 스트림' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '정상 작동 완료' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/aid/chat/ask/stream'),
    (0, common_1.UseGuards)(restApiKey_guard_1.RestApiKeyGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, projcet_decorator_1.Project)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_ask_to_ai_dto_1.ChatAskToAiDTO, Object]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "askToAiWithProjectByStreaming", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('aidocent-rest-api-key'),
    (0, swagger_1.ApiOperation)({ summary: '프로젝트 기반으로 ai에게 질문하기  / 리턴타입: tts 보이스 스트림' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '정상 작동 완료',
        headers: {
            'aidocent-answer-text': {
                description: 'ai 답변 문자열',
                example: '안녕! 어떻게 지내?',
            },
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/aid/chat/ask/tts'),
    (0, common_1.UseGuards)(restApiKey_guard_1.RestApiKeyGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, projcet_decorator_1.Project)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_ask_to_ai_dto_1.ChatAskToAiDTO, Object]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "askToAiWithProjectReturnTTS", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('aidocent-rest-api-key'),
    (0, swagger_1.ApiOperation)({ summary: '음성파일로 질문하기' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '정상',
        headers: {
            'aidocent-question-text': {
                description: '질문으로 인식된 문자열',
            },
            'aidocent-answer-text': {
                description: 'ai 답변 문자열',
            },
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/aid/chat/ask/voice'),
    (0, common_1.UseGuards)(restApiKey_guard_1.RestApiKeyGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('questionVoice')),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, projcet_decorator_1.Project)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_ask_to_ai_dto_1.ChatAskToAiByVoiceDTO, Object, Object]),
    __metadata("design:returntype", void 0)
], AidocentController.prototype, "askToAiWithProjectByVoice", null);
AidocentController = __decorate([
    (0, swagger_1.ApiTags)('AI docent'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [aidocent_service_1.AidocentService])
], AidocentController);
exports.AidocentController = AidocentController;
//# sourceMappingURL=aidocent.controller.js.map