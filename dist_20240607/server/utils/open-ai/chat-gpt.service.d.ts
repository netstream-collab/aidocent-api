import { OpenAI } from 'openai';
import { ChatGptMessage } from './types/chat-message.type';
export declare class ChatGptService {
    private openai;
    private logger;
    private readonly REST_KEY;
    private readonly timeout;
    constructor();
    listModel(): Promise<OpenAI.Models.ModelsPage>;
    createChat(messages: ChatGptMessage[], reqModel?: string, timeoutCb?: (err: any) => any): Promise<{
        completion: OpenAI.Chat.Completions.ChatCompletion;
        answer: OpenAI.Chat.Completions.ChatCompletionMessage;
    }>;
    createChatStream(messages: ChatGptMessage[], reqModel?: string): Promise<import("openai/streaming").Stream<OpenAI.Chat.Completions.ChatCompletionChunk>>;
    getModel(model: string): string;
}
