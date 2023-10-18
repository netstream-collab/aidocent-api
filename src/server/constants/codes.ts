/**
 * 상수명
 * - 첫 문자는 대문자로, 카멜케이스
 * - 실제 코드값은 모두 대문자, 스네이크로 작성함
 * - 타입 단언 사용 const assertion
 */
const Codes = {
  /** 사용자 상태값 */
  MemberStatus: {
    /** 탈퇴 회원 */
    WITHDRAW: -99,
    /** 휴면 회원 */
    DORMANT: -50,
    /** 가입 대기 */
    PENDING: 0,
    /** 신규 회원 */
    NEWB: 9,
    /** 튜토리얼 마친 회원 */
    VALID: 10,
    SUPER: 100,
  },

  /** 사용자 성별 구분값 */
  MemberGender: {
    NONE: null,
    MALE: '0',
    FEMALE: '1',
    /** 중성 */
    NEUTRALITY: '2',
  },

  /** OAuth 로그인에서 플랫폼을 구분할 코드값 */
  OAuthProvider: {
    KAKAO: 'OAUTH_KAKAO',
    APPLE: 'OAUTH_APPLE',
  },

  /** 사용자 기기 상태값 */
  UserDeviceStatus: {
    /** 정상 */
    VALID: 'DST_VALID',
    /** 삭제됨 */
    DELETED: 'DST_DEL',
    /** 만료됨 */
    EXPIRED: 'DST_EXP',
  },

  /**  캐비닛 상태값 */
  CabinetStatus: {
    VALID: 'CST_VALID',
    DELETED: 'CST_DEL',
  },

  /** 캐비닛 꾸밈 저장 파일의 상태값 */
  CabinetDecorSaveStatus: {},

  /** 라커룸 회원 정보의 상태값 */
  RoomMemberStatus: {
    /** 정상 회원 */
    VALID: 'RMST_VALID',
    /** 탈퇴한 회원 */
    WITHDRAW: 'RMST_WDW',
  },

  /** 라커룸 타입 */
  RoomType: {
    DEFAULT: 'RT_DEF',
    PRIVATE: 'RT_PRIV',
    PUBLIC: 'RT_PUB',
  },

  /** 라커룸 상태값 */
  RoomStatus: {
    VALID: 'RST_VALID',
    DELETED: 'RST_DEL',
  },

  /** 알림 구분하는 타입 코드 */
  NotificationType: {
    /** 시스템 알림 */
    SYSTEM: 'NOTI_SYS',
    /** 노크 */
    KNOCK: 'NOTI_KNCOK',
    CHLT_REMIND: 'NOTI_CHLT_REMIND',
  },

  NotificationStatus: {
    /** 유효한 상태 */
    VALID: 'NOTIST_VALID',
    /** 읽음 상태 */
    READ: 'NOTIST_READ',
    /** 삭제됨 */
    DELETED: 'NOTIST_DEL',
  },

  /** 오브젝트 타입 */
  ObjectType: {
    DEFAULT: 'OBJT_DEF',
    STICKER: 'OBJT_STICKER',
    MEMO: 'OBJT_MEMO',
  },

  /** 오브젝트 상태값 */
  ObjectStatus: {
    VALID: 'OBJST_VALID',
    DELETED: 'OBJST_DEL',
  },

  /** 좌표계 구분 */
  TransformParentSpace: {
    DOOR: 'COOP_DOOR',
    INNER: 'COOP_INNER',
  },

  /** 종이 그룹 타입 */
  PaperGroupType: {
    CHAT_LETTER: 'PGT_CHLT',
  },

  /** 종이 그룹 상태값 */
  PaperGroupStatus: {
    VALID: 'PGST_VALID',
    SAVED: 'PGST_SAVE',
    DELETED: 'PGST_DEL',
  },

  /** 커뮤니케이션 종이 타입 */
  PaperType: {
    MEMO: 'PT_MEMO',
    SINGLE_LETTER: 'PT_SLT',
    CHAT_LETTER: 'PT_CHLT',
  },

  /** 커뮤니케이션 종이 상태값 */
  PaperStatus: {
    VALID: 'PST_VALID',
    DELETED: 'PST_DEL',
  },

  /** 메세지 타입 */
  MsgType: {
    DEFAULT: 'MSGT_TEXT',
    TEXT: 'MSGT_TEXT',
    IMG: 'MSGT_IMG',
    VIDEO: 'MSGT_VIDEO',
    DRAW: 'MSGT_DRAW',
    RETURN: 'MSGT_RE',
    SYSREM_RETURN: 'MSGT_SYSRE',
  },

  /** 메세지 상태값 */
  MsgStatus: {
    VALID: 'MSGST_VALID',
    EXPIRED: 'MSGST_EXP',
    DELETED: 'MSGST_DEL',
    SAVED: 'MSGST_SAVE',
  },

  /** 아이템 상태값 */
  ItemStatus: {
    /** 시스템 기본적으로 제공하는 아이템 */
    SYS_DEF: 'ITMST_SYS_DEF',

    /** 유효한 아이템 */
    VALID: 'ITMO_VALID',

    /** 유효하지않고, 삭제된 아이템 */
    DELETED: 'ITMST_DEL',
  },

  /** 아이템 공개범위 값 */
  ItemOpen: {
    /** 유효하며, 공개된 아이템 */
    PUBLIC: 'ITMO_PUB',

    /** 유효하지만, 공개되지 않은 아이템 */
    HIDE: 'ITMO_HIDE',
  },

  /** 아이템 구분 */
  ItemType: {
    CABINET: 'ITM_CAB',
    PACK: 'ITM_PACK',
    STICKER: 'ITM_STICKER',
    MODEL_DECOR: 'ITM_3D_DECOR',
  },

  /** 아이템 무드 카테고리 (현재 사용x) */
  ItemCategoty: {},

  /** 사용자 소유 아이템 상태값 */
  UserItemStatus: {
    VALID: 'UITMST_VALID',
    DELETED: 'UITMST_DEL',
  },

  MMtype: {
    IMAGE: 'MM_IMG',
    VIDEO: 'MM_VIDEO',
    MODEL: 'MM_MODEL',
    ETC: 'MM_ETC',
  },

  CBTReviewStatus: {
    VALID: 'CBTRST_VALID',
    DELETED: 'CBTRST_DEL',
  },
} as const;

export default Codes;
