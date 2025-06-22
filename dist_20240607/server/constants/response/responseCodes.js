"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTStatusCodes = exports.ResponseMessage = exports.StatusCodes = void 0;
exports.StatusCodes = {
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
};
exports.ResponseMessage = {
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
};
const statusCodes = Object.keys(exports.StatusCodes);
function isTStatusCodes(v) {
    return statusCodes.includes(v);
}
exports.isTStatusCodes = isTStatusCodes;
//# sourceMappingURL=responseCodes.js.map