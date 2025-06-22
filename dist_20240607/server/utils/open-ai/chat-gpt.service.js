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
var ChatGptService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGptService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const text_util_1 = require("../common/text.util");
const codes_1 = require("../../constants/codes");
let ChatGptService = ChatGptService_1 = class ChatGptService {
    constructor() {
        this.logger = new common_1.Logger(ChatGptService_1.name);
        this.REST_KEY = process.env.OPENAI_API_KEY;
        this.timeout = 60 * 1000;
        this.openai = new openai_1.OpenAI({
            apiKey: this.REST_KEY,
        });
    }
    async listModel() {
        const list = await this.openai.models.list();
        this.logger.debug(list);
        return list;
    }
    async createChat(messages, reqModel, timeoutCb) {
        var _a;
        try {
            if ((0, text_util_1.isEmpty)(messages))
                return null;
            const model = this.getModel(reqModel);
            this.logger.debug('> GPT messages: ', messages);
            this.logger.debug('> GPT model: ', model);
            const completion = await this.openai.chat.completions.create({
                model: model,
                messages: messages,
            }, {
                timeout: this.timeout,
            });
            this.logger.debug('chatGPT usage tokens: ', completion.usage);
            const answer = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message;
            return { completion, answer };
        }
        catch (error) {
            this.logger.debug(error);
            if (error.code == 'ECONNABORTED') {
                if (timeoutCb) {
                    timeoutCb(error);
                }
            }
            const errRes = error.response;
            console.log(errRes === null || errRes === void 0 ? void 0 : errRes.data);
            throw new Error(errRes.message);
        }
    }
    async createChatStream(messages, reqModel) {
        if ((0, text_util_1.isEmpty)(messages))
            return null;
        const model = this.getModel(reqModel);
        this.logger.debug('> GPT messages: ', messages);
        this.logger.debug('> GPT model: ', model);
        const stream = await this.openai.chat.completions.create({
            model: model,
            messages: messages,
            stream: true,
        }, {
            timeout: this.timeout,
        });
        return stream;
    }
    getModel(model) {
        if (!codes_1.default.LLMModels.includes(model)) {
            return codes_1.default.LLMModels[0];
        }
        return model;
    }
};
ChatGptService = ChatGptService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChatGptService);
exports.ChatGptService = ChatGptService;
//# sourceMappingURL=chat-gpt.service.js.map