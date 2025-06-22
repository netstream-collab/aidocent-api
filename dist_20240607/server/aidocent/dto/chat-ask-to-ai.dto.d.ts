/// <reference types="multer" />
export declare class ChatAskToAiDTO {
    readonly convoSessionId: string;
    readonly question: string;
    readonly length?: string;
    readonly resType?: string;
    readonly model?: string;
    readonly limit?: number;
    readonly isRemind?: number;
}
declare const ChatAskToAiByVoiceDTO_base: import("@nestjs/common").Type<Omit<ChatAskToAiDTO, "question">>;
export declare class ChatAskToAiByVoiceDTO extends ChatAskToAiByVoiceDTO_base {
    questionVoice: Express.Multer.File;
}
export {};
