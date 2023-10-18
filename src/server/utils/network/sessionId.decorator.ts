import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SessionId = createParamDecorator((data: string, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  const sessionId = request.sessionID;
  return sessionId;
});
