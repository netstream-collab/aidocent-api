"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSearchJsonService = void 0;
const common_1 = require("@nestjs/common");
const restApi_util_1 = require("../common/restApi.util");
const text_util_1 = require("../common/text.util");
const object_util_1 = require("../common/object.util");
let CustomSearchJsonService = class CustomSearchJsonService {
    constructor() {
        this.ApiKey = process.env.GOOGLE_CUSTOM_SEARCH_JSON_API_KEY;
        this.MainCX = process.env.GOOGLE_CUSTOM_SEARCH_JSON_CX;
    }
    async search(query, option) {
        const queryString = (0, text_util_1.queryStringify)(Object.assign({ key: this.ApiKey, cx: this.MainCX, q: query }, option));
        const response = await restApi_util_1.default.request('GET', `https://www.googleapis.com/customsearch/v1?${queryString}`);
        return response;
    }
    format(items) {
        return items.map((item) => {
            return (0, object_util_1.classToObjectByKeys)(item, 'title', 'link', 'snippet');
        });
    }
};
CustomSearchJsonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CustomSearchJsonService);
exports.CustomSearchJsonService = CustomSearchJsonService;
//# sourceMappingURL=custom-search-json.service.js.map