"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicResponse = void 0;
class BasicResponse {
    constructor(status, resultCode, message, error, data) {
        this._status = 0;
        this._resultCode = '00';
        this._message = null;
        if (status) {
            this._status = status;
            this._resultCode = resultCode;
            this._message = message;
            this._error = error;
            this._data = data;
        }
        return this;
    }
    get(key) {
        return this[`_${key}`];
    }
    getStatus() {
        return this._status;
    }
    getError(key) {
        if (key)
            return this._error[key] || '';
        return this._error;
    }
    status(status) {
        this._status = status;
        return this;
    }
    resultCode(code) {
        if (typeof code === 'string') {
            this._resultCode = code;
        }
        else {
            this._resultCode = code.code;
            this._message = code.description;
        }
        return this;
    }
    message(message) {
        this._message = message;
        return this;
    }
    error(error) {
        this._error = error;
        return this;
    }
    data(data) {
        this._data = data;
        return this;
    }
    getData() {
        return this._data;
    }
    toJSON() {
        return {
            status: this._status,
            resultCode: this._resultCode,
            message: this._message,
            error: this._error,
            data: this._data || {},
        };
    }
}
exports.BasicResponse = BasicResponse;
//# sourceMappingURL=basicResponse.js.map