"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestResponseLogger = void 0;
const network_util_1 = require("../../utils/network/network.util");
const CommonLogger_1 = require("./CommonLogger");
function isHealthCheckReq(originalUrl) {
    return originalUrl === '/health';
}
function logRequest(reqLogData) {
    var _a;
    if (isHealthCheckReq(reqLogData.url)) {
        CommonLogger_1.default.name('REQ').healthCheck(`${reqLogData.method} ${reqLogData.url} "${reqLogData.sessionID}" ${reqLogData.ip} H- ${reqLogData.userAgent} ${(_a = reqLogData.headers) === null || _a === void 0 ? void 0 : _a.host}`);
    }
    else if (reqLogData.url == '/favicon.ico') {
        CommonLogger_1.default.name('RES').log(`none favicon ${reqLogData.url} "${reqLogData.sessionID}" ${reqLogData.ip} ${reqLogData.userAgent}`);
    }
    else {
        CommonLogger_1.default.name('REQ').log(`${reqLogData.method} ${reqLogData.url} "${reqLogData.sessionID}" ${reqLogData.ip} ${reqLogData.userAgent}`);
        CommonLogger_1.default.name('REQ').log('headers: ' + JSON.stringify(reqLogData.headers));
        CommonLogger_1.default.name('REQ').log(`body: `, reqLogData.body);
    }
}
function logResponse(resLogData) {
    if (isHealthCheckReq(resLogData.url)) {
        CommonLogger_1.default.name('RES').healthCheck(`Health check ${resLogData.requestUrl} ${resLogData.statusCode} ${resLogData.statusMessage} - ${resLogData.responseTime} ms`);
    }
    else if (resLogData.url == '/favicon.ico') {
        CommonLogger_1.default.name('RES').log(`none favicon ${resLogData.requestUrl} ${resLogData.statusCode} ${resLogData.statusMessage} - ${resLogData.responseTime} ms`);
    }
    else if (resLogData.url.includes('_next')) {
        CommonLogger_1.default.name('RES').log(`Next.js ${resLogData.requestUrl} "${resLogData.sessionID}" ${resLogData.statusCode} ${resLogData.statusMessage} - ${resLogData.responseTime} ms`);
    }
    else {
        CommonLogger_1.default.name('RES').log(`${resLogData.requestUrl} "${resLogData.sessionID}" ${resLogData.statusCode} ${resLogData.statusMessage} - ${resLogData.responseTime} ms`);
        CommonLogger_1.default.name('RES').log('headers: ' + JSON.stringify(resLogData.headers));
        if (resLogData.headers['content-length'] < 1000) {
            CommonLogger_1.default.name('RES').log('body: ' + JSON.stringify(resLogData.body));
        }
        else {
            CommonLogger_1.default.name('RES').log('body: content-length is bigger than 1000 ');
        }
    }
}
function RequestResponseLogger(req, res, next) {
    const startTime = performance.now();
    const requestIP = (0, network_util_1.getIP)(req);
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
exports.RequestResponseLogger = RequestResponseLogger;
//# sourceMappingURL=requestResponse.logger.js.map