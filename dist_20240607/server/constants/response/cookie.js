"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
dotenv.config();
class Cookie {
    constructor() { }
    static set(response, key, value, option) {
        this.logger.debug(`set ${key} : ${value} `, option);
        response.cookie(key, value, option);
    }
    static bulkSet(response, key, value, domains, option) {
        domains.map((domain) => {
            if (domain) {
                this.set(response, key, value, Object.assign(Object.assign({}, option), { domain }));
            }
        });
    }
}
exports.Cookie = Cookie;
Cookie.logger = new common_1.Logger('Cookie');
//# sourceMappingURL=cookie.js.map