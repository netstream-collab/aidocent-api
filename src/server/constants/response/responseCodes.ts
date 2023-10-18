export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  WRONG_DATA: 406,
  CONFLICT: 409,
  ENTITIY_TOO_LONG: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,

  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ResponseMessage = {
  200: 'Ok',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',

  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Wrong Data',
  409: 'Confict',
  413: 'Entity Too Long',
  415: 'Unsupported Media Type',

  500: 'Server Error',
} as const;

export type TStatusCodes = keyof typeof StatusCodes | keyof typeof ResponseMessage;

const statusCodes = Object.keys(StatusCodes);
export function isTStatusCodes(v: any) {
  return statusCodes.includes(v);
}
