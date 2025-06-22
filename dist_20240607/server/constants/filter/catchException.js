"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const axios_1 = require("axios");
const resultCode_1 = require("../resultCode");
const basicResponse_1 = require("../response/basicResponse");
const responseCodes_1 = require("../response/responseCodes");
const rTracer = require("cls-rtracer");
const object_util_1 = require("../../utils/common/object.util");
let CatchExceptionFilter = class CatchExceptionFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
        this.logger = new common_1.Logger('Filter');
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        if (request.originalUrl === '/favicon.ico') {
            return;
        }
        let errorRespnse = {};
        let errorStatus;
        let errorStack = exception;
        if (exception instanceof common_1.HttpException) {
            errorRespnse = exception.getResponse();
            errorStatus = exception.getStatus();
        }
        else if (exception instanceof axios_1.AxiosError) {
            errorRespnse = exception.response;
            errorStack = {
                code: exception.code,
                data: (0, object_util_1.classToObjectByKeys)(exception.response, 'code', 'status', 'statusText', 'data'),
                stack: exception.stack,
            };
        }
        else {
            this.logger.debug(`(${exception.constructor.name}) This Exception is not instance of HttpException.`);
        }
        const { status, resultCode, message, error, data } = this.setErrorResponse(exception.toString(), errorRespnse, errorStatus);
        const httpError = new basicResponse_1.BasicResponse(status, resultCode, message, error, data);
        this.logger.debug('************************************************************');
        this.logger.error(`${httpError.get('resultCode')}: ${httpError.get('message')}`);
        this.logger.error(errorStack);
        const { httpAdapter } = this.httpAdapterHost;
        httpAdapter.reply(ctx.getResponse(), httpError, httpError.getStatus());
    }
    setErrorResponse(errorMsg, errorRespnse, errorStatus) {
        var _a, _b;
        const rid = String(rTracer.id()).slice(0, 8);
        const status = errorStatus || responseCodes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        const resultCode = ((_a = errorRespnse['error']) === null || _a === void 0 ? void 0 : _a.code) || resultCode_1.ResultCodes.ERR01.code;
        const message = (((_b = errorRespnse['error']) === null || _b === void 0 ? void 0 : _b.description) || resultCode_1.ResultCodes.ERR01.description) + ` (rid:${rid})`;
        const error = errorRespnse['message'] || errorMsg;
        const data = errorRespnse['data'] || {};
        return { status, resultCode, message, error, data };
    }
};
CatchExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], CatchExceptionFilter);
exports.default = CatchExceptionFilter;
//# sourceMappingURL=catchException.js.map