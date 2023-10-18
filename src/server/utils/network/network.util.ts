import { Request } from 'express';
import * as RequestIp from 'request-ip';

export function getIP(req: Request): string {
  const requestIp = RequestIp.getClientIp(req);
  const regIp = requestIp?.match(
    /(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}/g,
  );
  const clearIp = regIp && regIp[0];
  const resultIp = clearIp || requestIp;
  return resultIp;
}
