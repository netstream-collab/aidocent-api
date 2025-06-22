"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionId = void 0;
const common_1 = require("@nestjs/common");
exports.SessionId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const sessionId = request.sessionID;
    return sessionId;
});
//# sourceMappingURL=sessionId.decorator.js.map