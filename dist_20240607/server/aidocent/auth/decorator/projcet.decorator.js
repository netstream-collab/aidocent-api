"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const common_1 = require("@nestjs/common");
exports.Project = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const project = request.project;
    return data ? project === null || project === void 0 ? void 0 : project[data] : project;
});
//# sourceMappingURL=projcet.decorator.js.map