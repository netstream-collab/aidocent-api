"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestIP = void 0;
const common_1 = require("@nestjs/common");
const network_util_1 = require("./network.util");
exports.RequestIP = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const requestIp = (0, network_util_1.getIP)(request);
    return requestIp;
});
//# sourceMappingURL=requestIp.decorator.js.map