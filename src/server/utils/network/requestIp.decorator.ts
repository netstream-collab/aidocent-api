import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getIP } from './network.util';

export const RequestIP = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const requestIp = getIP(request);
    return requestIp;
  },
);
