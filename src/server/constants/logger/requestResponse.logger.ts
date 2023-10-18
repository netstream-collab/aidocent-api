import { NextFunction, Request, Response } from 'express';
import { getIP } from 'src/server/utils/network/network.util';
import _l from './CommonLogger';

function isHealthCheckReq(originalUrl) {
  return originalUrl === '/health';
}

function logRequest(reqLogData) {
  if (isHealthCheckReq(reqLogData.url)) {
    _l.name('REQ').healthCheck(
      `${reqLogData.method} ${reqLogData.url} "${reqLogData.sessionID}" ${reqLogData.ip} H- ${reqLogData.userAgent} ${reqLogData.headers?.host}`,
    );
  } else if (reqLogData.url == '/favicon.ico') {
    // 의미 없는 request 요청
    _l.name('RES').log(
      `none favicon ${reqLogData.url} "${reqLogData.sessionID}" ${reqLogData.ip} ${reqLogData.userAgent}`,
    );
  } else {
    _l.name('REQ').log(
      `${reqLogData.method} ${reqLogData.url} "${reqLogData.sessionID}" ${reqLogData.ip} ${reqLogData.userAgent}`,
    );
    _l.name('REQ').log('headers: ' + JSON.stringify(reqLogData.headers));
    _l.name('REQ').log(`body: `, reqLogData.body);
  }
}

function logResponse(resLogData) {
  if (isHealthCheckReq(resLogData.url)) {
    _l.name('RES').healthCheck(
      `Health check ${resLogData.requestUrl} ${resLogData.statusCode} ${resLogData.statusMessage} - ${resLogData.responseTime} ms`,
    );
  } else if (resLogData.url == '/favicon.ico') {
    // 의미 없는 request 요청
    _l.name('RES').log(
      `none favicon ${resLogData.requestUrl} ${resLogData.statusCode} ${resLogData.statusMessage} - ${resLogData.responseTime} ms`,
    );
  } else if (resLogData.url.includes('_next')) {
    _l.name('RES').log(
      `Next.js ${resLogData.requestUrl} "${resLogData.sessionID}" ${resLogData.statusCode} ${resLogData.statusMessage} - ${resLogData.responseTime} ms`,
    );
  } else {
    _l.name('RES').log(
      `${resLogData.requestUrl} "${resLogData.sessionID}" ${resLogData.statusCode} ${resLogData.statusMessage} - ${resLogData.responseTime} ms`,
    );

    _l.name('RES').log('headers: ' + JSON.stringify(resLogData.headers));
    if (resLogData.headers['content-length'] < 1000) {
      _l.name('RES').log('body: ' + JSON.stringify(resLogData.body));
    } else {
      _l.name('RES').log('body: content-length is bigger than 1000 ');
    }
  }
}

/**
 * Response Request Logger Middleware
 *
 * BasicResponse class 에서 하지 않은 이유
 * - 한곳에서 관리 되지 않음
 * - 실제 response로 보낸 값이 아닐 수 도 있음
 * - execption/error 같은 경우 basicResponse class를 거치지 않을 수 있음
 */
export function RequestResponseLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = performance.now();
  const requestIP = getIP(req);

  const reqLogData = {
    host: req.get('host'),
    referer: req.get('referer'),
    origin: req.headers['origin'],
    method: req.method,
    url: req.originalUrl,
    ip: requestIP,
    sessionID: req['sessionID'],
    userAgent: req.get('user-agent'),
    headers: req.headers,
    body: req.body,
  };

  logRequest(reqLogData);

  const oldJson = res.json;
  res.json = (body) => {
    res.locals.body = body;
    return oldJson.call(res, body);
  };

  // log response
  res.on('finish', () => {
    const resLogData = {
      sessionID: req['sessionID'],
      url: reqLogData.url,
      requestUrl: `${reqLogData.method} ${reqLogData.url}`,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      headers: res.getHeaders(),
      responseTime: +(performance.now() - startTime).toFixed(3),
      body: res.locals.body || '',
    };

    logResponse(resLogData);
  });

  next();
}
