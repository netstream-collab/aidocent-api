export type TResultCodeData = {
  code: string;
  description: string;
  detail?: string;
};

export const ResultCodes = {
  ERR01: {
    code: 'ERR01',
    description: 'Something wrong...',
    detail: '기본 에러 메시지',
  },
};
