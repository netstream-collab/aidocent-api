import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export default class CatchExceptionFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    private readonly logger;
    constructor(httpAdapterHost: HttpAdapterHost);
    catch(exception: any, host: ArgumentsHost): void;
    private setErrorResponse;
}
