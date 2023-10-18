import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject, Logger } from '@nestjs/common';
import { HttpArgumentsHost, HttpServer } from '@nestjs/common/interfaces';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { AxiosError } from 'axios';
import _l from '../logger/CommonLogger';
import { ResultCodes } from '../resultCode';
import { BasicResponse } from '../response/basicResponse';
import { StatusCodes } from '../response/responseCodes';
import * as rTracer from 'cls-rtracer';
import { classToObjectByKeys } from 'src/server/utils/common/object.util';

@Catch()
export default class CatchExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Filter');
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request = ctx.getRequest();

    // 불필요한 로그 안찍히게
    if (request.originalUrl === '/favicon.ico') {
      return;
    }

    let errorRespnse: any = {};
    let errorStatus: number;
    let errorStack = exception;

    if (exception instanceof HttpException) {
      errorRespnse = exception.getResponse();
      errorStatus = exception.getStatus();
    } else if (exception instanceof AxiosError) {
      // status; statusText; data;
      errorRespnse = exception.response;
      errorStack = {
        code: exception.code,
        data: classToObjectByKeys(exception.response, 'code', 'status', 'statusText', 'data'),
        stack: exception.stack,
      };
    } else {
      // XXXX() is not a function 와 같은 서버 자체에서 발생한 오류일때
      this.logger.debug(`(${exception.constructor.name}) This Exception is not instance of HttpException.`);
    }

    const { status, resultCode, message, error, data } = this.setErrorResponse(exception.toString(), errorRespnse, errorStatus);
    const httpError = new BasicResponse(status, resultCode, message, error, data);

    this.logger.debug('************************************************************');
    this.logger.error(`${httpError.get('resultCode')}: ${httpError.get('message')}`);
    this.logger.error(errorStack);

    const { httpAdapter } = this.httpAdapterHost;
    httpAdapter.reply(ctx.getResponse(), httpError, httpError.getStatus());
  }

  private setErrorResponse(errorMsg: string, errorRespnse: any, errorStatus?: number) {
    const rid = String(rTracer.id()).slice(0, 8);
    const status = errorStatus || StatusCodes.INTERNAL_SERVER_ERROR;
    const resultCode = errorRespnse['error']?.code || ResultCodes.ERR01.code;
    const message = (errorRespnse['error']?.description || ResultCodes.ERR01.description) + ` (rid:${rid})`;
    const error = errorRespnse['message'] || errorMsg; // 에러의 상세 메시지를 가리기 위해
    const data = errorRespnse['data'] || {};

    return { status, resultCode, message, error, data };
  }
}
