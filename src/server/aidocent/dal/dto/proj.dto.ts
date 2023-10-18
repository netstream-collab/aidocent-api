import { Exclude, Expose, Transform, Type } from 'class-transformer';

/**
 * class-transformer 사용 예시
 *
 * 주의
 * - name groups를 같이 쓰면 적용이 안됨
 *  - @Expose({ toClassOnly: true, groups: ['user'] }) 이런 경우엔 적용이됨
 * @link https://github.com/typestack/class-transformer/issues/331
 */
export class IProj {
  @Expose({ name: 'nPROJ_ID' })
  @Type(() => Number)
  projId?: number;

  @Expose({ name: 'sUUID' })
  uuid?: string;

  @Expose({ name: 'sPROJ_CODE' })
  projCode: string;

  @Expose({ name: 'cSTATUS' })
  status: string;

  @Expose({ name: 'sNAME' })
  name: string;

  @Expose({ name: 'sDESCRIPTION' })
  description?: string;

  @Expose({ name: 'tUSER_PROMPT' })
  userPrompt?: string;

  @Expose({ name: 'tMEMO' })
  memo?: string;

  @Expose({ name: 'sREST_API_KEY' })
  restApiKey?: string;

  /* Date ------------------------------------------------------------------ */

  @Expose({ name: 'dCREATE' })
  createDate?: string;

  @Expose({ name: 'dUPDATE' })
  updateDate?: string;

  @Expose({ name: 'dDELETE' })
  deleteDate?: string;
}
