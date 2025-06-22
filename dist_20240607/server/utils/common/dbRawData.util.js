"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setObjectDotProp = exports.setDotProps = void 0;
const text_util_1 = require("./text.util");
const set = require("set-value");
function setDotProps(value) {
    if ((0, text_util_1.isEmpty)(value))
        return null;
    let result;
    if (Array.isArray(value)) {
        result = value.map((data) => setObjectDotProp(data));
    }
    else {
        result = setObjectDotProp(value);
    }
    return result;
}
exports.setDotProps = setDotProps;
function setObjectDotProp(obj) {
    if (!obj)
        return;
    const result = {};
    const keys = Object.keys(obj);
    for (const key of keys) {
        set(result, key, obj[key]);
    }
    return result;
}
exports.setObjectDotProp = setObjectDotProp;
//# sourceMappingURL=dbRawData.util.js.map