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
export class IChatHis {
  @Expose({ name: 'nCHAT_ID' })
  @Type(() => Number)
  chatId?: number;

  @Expose({ name: 'nPROJ_ID' })
  @Type(() => Number)
  projId: number;

  @Expose({ name: 'sUUID' })
  uuid?: string;

  @Expose({ name: 'sCONVO_SESSION_ID' })
  convoSessionId: string;

  @Expose({ name: 'cTYPE' })
  type: string;

  @Expose({ name: 'cSTATUS' })
  status: string;

  @Expose({ name: 'cSPEAKER_ROLE' })
  speakerRole: string;

  @Expose({ name: 'tCONTENT' })
  content: string;

  @Expose({ name: 'tERROR_MSG' })
  errorMsg?: string;

  @Expose({ name: 'cRES_TYPE' })
  resType?: string;

  /* Date ------------------------------------------------------------------ */

  @Expose({ name: 'dCREATE' })
  createDate?: string;

  @Expose({ name: 'dUPDATE' })
  updateDate?: string;

  @Expose({ name: 'dDELETE' })
  deleteDate?: string;
}

export class IGptMessageFromChat {
  @Expose({ name: 'nCHAT_ID' })
  @Type(() => Number)
  chatId?: number;

  @Expose({ name: 'cSPEAKER_ROLE' })
  role: TChatGptRole;

  @Expose({ name: 'tCONTENT' })
  content: string;
}
