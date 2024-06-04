import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { TChatGptRole } from 'src/server/utils/open-ai/types/chat-message.type';

/**
 * class-transformer 사용 예시
 *
 * 주의
 * - name groups를 같이 쓰면 적용이 안됨
 *  - @Expose({ toClassOnly: true, groups: ['user'] }) 이런 경우엔 적용이됨
 * @link https://github.com/typestack/class-transformer/issues/331
 */
export class IMemory {
  @Expose({ name: 'nMEMORY_ID' })
  @Type(() => Number)
  memoryId?: number;

  @Expose({ name: 'sCONVO_SESSION_ID' })
  convoSessionId?: string;

  @Expose({ name: 'nLAST_CHAT_ID' })
  @Type(() => Number)
  lastChatId?: number;

  @Expose({ name: 'tCONTENT' })
  content?: string;

  /* Date ------------------------------------------------------------------ */

  @Expose({ name: 'dCREATE' })
  createDate?: string;

}
