"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const text_util_1 = require("./text.util");
axios_1.default.defaults.withCredentials = true;
class RestApi {
    static async request(method, url, body, headers, getRawRes) {
        function logResponse() {
            const { status, statusText, headers, data } = response;
            const resLog = { status, statusText, headers, data };
            console.log('RestApi RESPONSE:', resLog);
            console.log('RestApi RESPONSE URL:', response.request.res.responseUrl);
        }
        function logRequest() {
            console.log(`RestApi REQUEST: ${method} ${url}`);
        }
        if ((0, text_util_1.isEmpty)(url)) {
            throw new Error('RestApi: Please enter url (include host url).');
        }
        logRequest();
        const response = await (0, axios_1.default)({
            method: method,
            url: url,
            data: body,
            headers,
        });
        if (getRawRes) {
            return response;
        }
        else {
            return response.data;
        }
    }
    static async requestStream(method, url, body, headers) {
        function logResponse() {
            const { status, statusText, headers, data } = response;
            const resLog = { status, statusText, headers, data };
            console.log('RestApi RESPONSE:', resLog);
            console.log('RestApi RESPONSE URL:', response.request.res.responseUrl);
        }
        function logRequest() {
            console.log(`RestApi REQUEST: ${method} ${url}`);
            console.log(`RestApi REQUEST BODY: ${body ? JSON.stringify(body) : ''}`);
        }
        if ((0, text_util_1.isEmpty)(url)) {
            throw new Error('RestApi: Please enter url (include host url).');
        }
        logRequest();
        const response = await (0, axios_1.default)({
            method: method,
            url: url,
            data: body,
            headers,
            responseType: 'stream',
        });
        logResponse();
        return response;
    }
}
exports.default = RestApi;
//# sourceMappingURL=restApi.util.js.map