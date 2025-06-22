"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGptMessage = void 0;
class ChatGptMessage {
    constructor(role, content) {
        this.role = role;
        this.content = content;
        return {
            role,
            content,
        };
    }
}
exports.ChatGptMessage = ChatGptMessage;
//# sourceMappingURL=chat-message.type.js.map