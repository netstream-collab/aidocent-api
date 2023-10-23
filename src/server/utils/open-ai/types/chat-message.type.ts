/**
 *
 */
export type TChatGptRole = 'system' | 'assistant' | 'user';

export class ChatGptMessage {
  role: TChatGptRole;
  content: string;

  constructor(role: TChatGptRole, content: string) {
    this.role = role;
    this.content = content;
    return {
      role,
      content,
    };
  }
}
