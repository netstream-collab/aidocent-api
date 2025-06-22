"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIP = void 0;
const RequestIp = require("request-ip");
function getIP(req) {
    const requestIp = RequestIp.getClientIp(req);
    const regIp = requestIp === null || requestIp === void 0 ? void 0 : requestIp.match(/(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}/g);
    const clearIp = regIp && regIp[0];
    const resultIp = clearIp || requestIp;
    return resultIp;
}
exports.getIP = getIP;
//# sourceMappingURL=network.util.js.map