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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var AidocentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AidocentService = void 0;
const common_1 = require("@nestjs/common");
const chat_gpt_service_1 = require("../utils/open-ai/chat-gpt.service");
const basicResponse_1 = require("../constants/response/basicResponse");
const chatHis_dal_1 = require("./dal/layers/chatHis.dal");
const proj_dal_1 = require("./dal/layers/proj.dal");
const CommonLogger_1 = require("../constants/logger/CommonLogger");
const date_util_1 = require("../utils/common/date.util");
const cookie_1 = require("../constants/response/cookie");
const text_util_1 = require("../utils/common/text.util");
const codes_1 = require("../constants/codes");
const clova_voice_service_1 = require("../utils/clova/clova-voice.service");
const chat_message_type_1 = require("../utils/open-ai/types/chat-message.type");
const whisper_service_1 = require("../utils/open-ai/whisper.service");
const clova_csr_service_1 = require("../utils/clova/clova-csr.service");
const etri_service_1 = require("../utils/etri/etri.service");
const custom_search_json_service_1 = require("../utils/google/custom-search-json.service");
const memory_dal_1 = require("./dal/layers/memory.dal");
let AidocentService = AidocentService_1 = class AidocentService {
    constructor(chatGptService, whisperService, clovaVoiceService, etriService, clovaCSRService, chatHisDAL, projDAL, memoryDAL, customSearchJsonService) {
        this.chatGptService = chatGptService;
        this.whisperService = whisperService;
        this.clovaVoiceService = clovaVoiceService;
        this.etriService = etriService;
        this.clovaCSRService = clovaCSRService;
        this.chatHisDAL = chatHisDAL;
        this.projDAL = projDAL;
        this.memoryDAL = memoryDAL;
        this.customSearchJsonService = customSearchJsonService;
        this.logger = new common_1.Logger(AidocentService_1.name);
    }
    async searchTest() {
        const searchResult = await this.customSearchJsonService.search('작가 박봉수 탈영역우정국 꿈 몽상가들의 모임 드림 옥션', {
            num: 5,
        });
        const search = this.customSearchJsonService.format(searchResult.items);
        const prompt = `\`\`\`\n${JSON.stringify(search)}\n\`\`\`위 내용을 개괄식으로 요약 정리해라`;
        const userrMessage = new chat_message_type_1.ChatGptMessage('user', prompt);
        const { answer } = await this.chatGptService.createChat([userrMessage]);
        return new basicResponse_1.BasicResponse().status(200).message('').data({ answer, search });
    }
    async getAllProject() {
        const project = await this.projDAL.findAll();
        return new basicResponse_1.BasicResponse().status(200).message('').data({ allCount: 0, project });
    }
    async createNewProject(body) {
        const project = await this.projDAL.create({
            status: codes_1.default.ProjectStatus.VALID,
            projCode: body.code,
            name: body.name,
            description: body.description,
            memo: body.memo,
            userPrompt: body.userPrompt,
            tags: body.tags || '',
        });
        const restApiKey = project.uuid.slice(0, 2) + '-' + project.projCode;
        await this.projDAL.updateRestApiKey(project.projId, restApiKey);
        return new basicResponse_1.BasicResponse()
            .status(200)
            .message('')
            .data(Object.assign(Object.assign({}, project), { restApiKey }));
    }
    async getOneProjectInfo(projId) {
        const result = await this.projDAL.findOne(projId);
        return new basicResponse_1.BasicResponse().status(200).message('').data(result);
    }
    async updateProjectInfo(projId, body) {
        const result = await this.projDAL.update(projId, body);
        return new basicResponse_1.BasicResponse().status(200).message('').data(result);
    }
    async deleteOneProject(projId) {
        const result = await this.projDAL.update(projId, {
            status: codes_1.default.ProjectStatus.DELETED,
        });
        return new basicResponse_1.BasicResponse().status(200).message('').data(result);
    }
    async renewRestApiKeyOfProject(projId) {
        const project = await this.projDAL.validate(projId);
        const restApiKey = project.uuid.slice(0, 2) + '-' + project.projCode;
        await this.projDAL.updateRestApiKey(projId, restApiKey);
        return new basicResponse_1.BasicResponse().status(200).message('').data({ restApiKey: restApiKey });
    }
    async getAllConvoOfProject(projId) {
        const convos = await this.chatHisDAL.findAllConvoSessionIdOfProject(projId);
        return new basicResponse_1.BasicResponse().status(200).message('').data({ convos });
    }
    async getAllChatsOfConvoSession(convoSessionId) {
        const chats = await this.chatHisDAL.findByConviSessionId(convoSessionId, 0);
        return new basicResponse_1.BasicResponse().status(200).message('').data({ chats });
    }
    async searchTagsSummary(response, body) {
        var _a, e_1, _b, _c;
        var _d, _e, _f;
        const searchQuery = (_d = body.tags) === null || _d === void 0 ? void 0 : _d.join(' ');
        const searchResult = await this.customSearchJsonService.search(searchQuery, {
            num: 10,
        });
        const search = this.customSearchJsonService.format(searchResult.items);
        const prompt = `\`\`\`\n${JSON.stringify(search)}\n\`\`\`내용을 개괄식으로 요약 정리해`;
        const userrMessage = new chat_message_type_1.ChatGptMessage('user', prompt);
        if (body.resType === 'text-stream') {
            const answerStream = await this.chatGptService.createChatStream([userrMessage]);
            let answerContent = '';
            try {
                for (var _g = true, answerStream_1 = __asyncValues(answerStream), answerStream_1_1; answerStream_1_1 = await answerStream_1.next(), _a = answerStream_1_1.done, !_a;) {
                    _c = answerStream_1_1.value;
                    _g = false;
                    try {
                        const part = _c;
                        const content = ((_f = (_e = part.choices[0]) === null || _e === void 0 ? void 0 : _e.delta) === null || _f === void 0 ? void 0 : _f.content) || '';
                        answerContent += content;
                        response.write(content);
                    }
                    finally {
                        _g = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_g && !_a && (_b = answerStream_1.return)) await _b.call(answerStream_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            const { answer } = await this.chatGptService.createChat([userrMessage]);
            return new basicResponse_1.BasicResponse().status(200).message('').data({ prompt: answer.content });
        }
    }
    async getProjectInfoByRestApiKey(project) {
        return new basicResponse_1.BasicResponse().status(200).message('').data(project);
    }
    async startNewConversation(response, projId) {
        const origin = `${projId}-${(0, date_util_1.getNow)('YYMMDD_HHmmssSSS')}-${(0, text_util_1.createUUID)().slice(-6)}`;
        const convoSessionId = Buffer.from(origin).toString('base64url');
        cookie_1.Cookie.set(response, 'aidocent-convo-session-id', convoSessionId, {
            httpOnly: true,
            secure: false,
        });
        return new basicResponse_1.BasicResponse().status(200).message('').data({
            convoSessionId,
        });
    }
    validateConvoSessionId(convoSessionId) {
        if ((0, text_util_1.isEmpty)(convoSessionId)) {
            throw Error('none convo session id.');
        }
        return true;
    }
    async askToAiWithProject(project, body) {
        this.logger.log('Ask to ai with project - start');
        const { userrMessage, messages } = await this.generateAiChatCompletionMessages(project, body);
        this.logger.log('Ask to ai with project - done to get chat history');
        this.logger.log('Ask to ai with project - ask gpt');
        const { answer } = await this.chatGptService.createChat(messages, body.model);
        this.logger.log('Ask to ai with project - done to ask gpt');
        if (!(0, text_util_1.isEmpty)(body.convoSessionId)) {
            this.logger.log('Ask to ai with project - create chat history');
            await this.chatHisDAL.bulkCreate([
                {
                    uuid: (0, text_util_1.createUUID)(),
                    projId: project.projId,
                    convoSessionId: body.convoSessionId,
                    type: '',
                    status: codes_1.default.ChatHisStatus.VALID,
                    speakerRole: userrMessage.role,
                    content: userrMessage.content,
                },
                {
                    uuid: (0, text_util_1.createUUID)(),
                    projId: project.projId,
                    convoSessionId: body.convoSessionId,
                    type: '',
                    status: codes_1.default.ChatHisStatus.VALID,
                    speakerRole: answer.role,
                    content: answer.content,
                    resType: codes_1.default.ChatHisResType.TEXT,
                    errorMsg: '',
                },
            ]);
            this.logger.log('Ask to ai with project - done to chat history');
        }
        return new basicResponse_1.BasicResponse().status(200).message('').data({ question: userrMessage, answer });
    }
    async askToAiWithProjectByStreaming(res, project, body) {
        var _a, e_2, _b, _c;
        var _d, _e;
        const { userrMessage, messages } = await this.generateAiChatCompletionMessages(project, body);
        const answerStream = await this.chatGptService.createChatStream(messages, body.model);
        let answerContent = '';
        try {
            for (var _f = true, answerStream_2 = __asyncValues(answerStream), answerStream_2_1; answerStream_2_1 = await answerStream_2.next(), _a = answerStream_2_1.done, !_a;) {
                _c = answerStream_2_1.value;
                _f = false;
                try {
                    const part = _c;
                    const content = ((_e = (_d = part.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content) || '';
                    answerContent += content;
                    res.write(content);
                }
                finally {
                    _f = true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_f && !_a && (_b = answerStream_2.return)) await _b.call(answerStream_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        res.end(() => {
            CommonLogger_1.default.name('RES').log('end');
            if (!(0, text_util_1.isEmpty)(body.convoSessionId)) {
                this.chatHisDAL.bulkCreate([
                    {
                        uuid: (0, text_util_1.createUUID)(),
                        projId: project.projId,
                        convoSessionId: body.convoSessionId,
                        type: '',
                        status: codes_1.default.ChatHisStatus.VALID,
                        speakerRole: userrMessage.role,
                        content: userrMessage.content,
                    },
                    {
                        uuid: (0, text_util_1.createUUID)(),
                        projId: project.projId,
                        convoSessionId: body.convoSessionId,
                        type: '',
                        status: codes_1.default.ChatHisStatus.VALID,
                        speakerRole: 'assistant',
                        content: answerContent,
                        resType: codes_1.default.ChatHisResType.TEXT,
                        errorMsg: '',
                    },
                ]);
            }
        });
    }
    async askToAiWithProjectReturnTTS(response, project, body) {
        this.logger.log('Ask to ai with project (TTS) - start');
        const { userrMessage, messages } = await this.generateAiChatCompletionMessages(project, body);
        this.logger.log('Ask to ai with project - done to get chat history');
        messages.push(new chat_message_type_1.ChatGptMessage('system', '1000자 이하로 tts로 변환하기 쉽도록 답변해.'));
        this.logger.log('Ask to ai with project (TTS) - ask gpt');
        const { answer } = await this.chatGptService.createChat(messages, body.model);
        this.logger.log('Ask to ai with project - done to ask gpt');
        this.logger.log('Ask to ai with project (TTS)  - make tts start');
        const ttsRes = await this.clovaVoiceService.makeTTS(answer.content);
        this.logger.log('Ask to ai with project (TTS) - make tts done');
        response.set({
            'content-type': ttsRes.headers['content-type'],
            'transfer-encoding': ttsRes.headers['transfer-encoding'],
            playtime: ttsRes.headers['playtime'],
            'aidocent-answer-text': encodeURI(answer.content),
            'aidocent-question-text': encodeURI(userrMessage.content),
        });
        ttsRes.data.pipe(response);
        if (!(0, text_util_1.isEmpty)(body.convoSessionId)) {
            this.logger.log('Ask to ai with project (TTS) - create chat history');
            await this.chatHisDAL.bulkCreate([
                {
                    projId: project.projId,
                    uuid: (0, text_util_1.createUUID)(),
                    convoSessionId: body.convoSessionId,
                    type: '',
                    status: codes_1.default.ChatHisStatus.VALID,
                    speakerRole: userrMessage.role,
                    content: userrMessage.content,
                },
                {
                    projId: project.projId,
                    uuid: (0, text_util_1.createUUID)(),
                    convoSessionId: body.convoSessionId,
                    type: '',
                    status: codes_1.default.ChatHisStatus.VALID,
                    speakerRole: answer.role,
                    content: answer.content,
                    resType: codes_1.default.ChatHisResType.VOICE,
                    errorMsg: '',
                },
            ]);
            this.logger.log('Ask to ai with project (TTS) - done to chat history');
        }
    }
    async askToAiWithProjectByVoice(response, project, body, questionVoiceFile) {
        const questionText = await this.whisperService.transcriptions(questionVoiceFile);
        this.logger.debug('questionText: ', questionText);
        const questionBody = {
            convoSessionId: body.convoSessionId,
            length: body.length,
            question: questionText,
        };
        switch (body === null || body === void 0 ? void 0 : body.resType) {
            case 'text-stream':
                await this.askToAiWithProjectByStreaming(response, project, questionBody);
                break;
            case 'tts':
                await this.askToAiWithProjectReturnTTS(response, project, questionBody);
                break;
            default:
                return await this.askToAiWithProject(project, questionBody);
        }
    }
    async generateAiChatCompletionMessages(project, body) {
        const infoPrompt = new chat_message_type_1.ChatGptMessage('system', 'title:' + project.name + '\n' + 'description:' + (project.description || ''));
        const prompt = project.userPrompt ? new chat_message_type_1.ChatGptMessage('system', project.userPrompt) : null;
        const userrMessage = new chat_message_type_1.ChatGptMessage('user', body.question);
        const messages = !(0, text_util_1.isEmpty)(body.convoSessionId)
            ? (await this.chatHisDAL.findByConviSessionIdForGpt(project.projId, body.convoSessionId, body.limit)).reverse()
            : [];
        if (body.isRemind === 1) {
            const memories = await this.memoryDAL.findByConviSessionId(body.convoSessionId);
            if (messages.length >= body.limit) {
                let flag = true;
                if (memories[0]) {
                    for (let i = 0; i < messages.length; i++) {
                        if (memories[0].lastChatId === messages[i].chatId) {
                            flag = false;
                            break;
                        }
                    }
                }
                if (flag) {
                    const memory = await this.chatGptService.createChat([new chat_message_type_1.ChatGptMessage('system', '다음 대화 기록을 chat gpt가 기억하기 쉽도록 요약하시오' + JSON.stringify(messages))], body.model);
                    const save = await this.memoryDAL.create({
                        convoSessionId: body.convoSessionId,
                        lastChatId: messages[messages.length - 1].chatId,
                        content: memory.answer.content,
                    });
                }
            }
            if (memories.length > 0) {
                messages.push(new chat_message_type_1.ChatGptMessage('system', '이전 대화 기록을 참고하여 답변하시오' + JSON.stringify(memories)));
            }
        }
        if (prompt)
            messages.unshift(prompt);
        messages.unshift(infoPrompt);
        messages.push(userrMessage);
        const lengthPrompt = this.createLengthPrompt(body.length);
        if (lengthPrompt)
            messages.push(new chat_message_type_1.ChatGptMessage('system', lengthPrompt));
        console.log('>>>>>>>>>>>>>>>>>>>', messages);
        return { userrMessage, messages };
    }
    createLengthPrompt(length) {
        switch (length) {
            case 'short':
                return '20초 이하의 분량으로 답해.';
            case 'long':
                return '5줄 이상의 분량으로 답해.';
            default:
                return '';
        }
    }
};
AidocentService = AidocentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_gpt_service_1.ChatGptService,
        whisper_service_1.WhisperService,
        clova_voice_service_1.ClovaVoiceService,
        etri_service_1.EtriService,
        clova_csr_service_1.ClovaCSRService,
        chatHis_dal_1.default,
        proj_dal_1.default,
        memory_dal_1.default,
        custom_search_json_service_1.CustomSearchJsonService])
], AidocentService);
exports.AidocentService = AidocentService;
//# sourceMappingURL=aidocent.service.js.map