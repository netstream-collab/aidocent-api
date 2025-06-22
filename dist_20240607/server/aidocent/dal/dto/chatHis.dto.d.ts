import { TChatGptRole } from 'src/server/utils/open-ai/types/chat-message.type';
export declare class IChatHis {
    chatId?: number;
    projId: number;
    uuid?: string;
    convoSessionId: string;
    type: string;
    status: string;
    speakerRole: string;
    content: string;
    errorMsg?: string;
    resType?: string;
    createDate?: string;
    updateDate?: string;
    deleteDate?: string;
}
export declare class IGptMessageFromChat {
    chatId?: number;
    role: TChatGptRole;
    content: string;
}
