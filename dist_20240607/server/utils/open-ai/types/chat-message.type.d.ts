export type TChatGptRole = 'system' | 'assistant' | 'user';
export declare class ChatGptMessage {
    role: TChatGptRole;
    content: string;
    constructor(role: TChatGptRole, content: string);
}
