/**
 * 상수명
 * - 첫 문자는 대문자로, 카멜케이스
 * - 실제 코드값은 모두 대문자, 스네이크로 작성함
 * - 타입 단언 사용 const assertion
 */
const Codes = {
  /** 프로젝트 상태값 */
  ProjectStatus: {
    VALID: 'PS_VALID',
    DELETED: 'PS_DEL',
  },

  ChatHisStatus: {
    VALID: 'CHS_VALID',
    ERROR: 'CHS_ERR',
  },

  ChatHisResType: {
    TEXT: 'CHRT_TEXT',
    VOICE: 'CHRT_VOICE',
  },

  /**
   * 0번째 인덱스가 기본값이다.
   *  @link https://platform.openai.com/docs/models/model-endpoint-compatibility
   */
  // LLMModels: ['gpt-4-1106-preview', 'gpt-3.5-turbo'] as string[],
 
  // LLMModels: ['gpt-4-1106-preview', 'gpt-3.5-turbo', 'gpt-3.5-turbo-1106'] as string[],
  LLMModels: ['gpt-3.5-turbo', 'gpt-4-1106-preview', 'gpt-3.5-turbo-1106'] as string[],
} as const;

export default Codes;
