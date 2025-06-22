"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64urlToUtf8 = exports.base64ToUtf8 = exports.base64urlToBase64 = exports.queryStringify = exports.ensureStringArray = exports.concatValues = exports.createRandomString = exports.convertObjectToJsonString = exports.convertStringToJson = exports.isEmpty = exports.isString = exports.createUUID = void 0;
const uuid_1 = require("uuid");
const crypto = require("crypto");
function createUUID() {
    return (0, uuid_1.v4)().replace(/-/gi, '');
}
exports.createUUID = createUUID;
function isString(value) {
    if (typeof value === 'string' || value instanceof String) {
        return true;
    }
    return false;
}
exports.isString = isString;
function isEmpty(value) {
    if (isString(value) && value == '') {
        return true;
    }
    else if (value == null || value == undefined || (value != null && typeof value == 'object' && !Object.keys(value).length)) {
        return true;
    }
    else {
        return false;
    }
}
exports.isEmpty = isEmpty;
function convertStringToJson(value) {
    try {
        if (isEmpty(value))
            return null;
        return JSON.parse(value);
    }
    catch (error) {
        console.warn('<!> Convert string to json error: ', error);
        return null;
    }
}
exports.convertStringToJson = convertStringToJson;
function convertObjectToJsonString(value) {
    try {
        if (isEmpty(value))
            return '';
        return JSON.stringify(value);
    }
    catch (error) {
        console.warn('<!> Convert object to jsonString error: ', error);
        return '';
    }
}
exports.convertObjectToJsonString = convertObjectToJsonString;
function createRandomString(length) {
    if (length > 20 || length < 1) {
        throw new Error('"length" must be a positive number and no more than 20.');
    }
    const string = crypto.randomBytes(20).toString('base64url');
    return string.slice(0, length);
}
exports.createRandomString = createRandomString;
function concatValues(...arg) {
    let concated = '';
    arg === null || arg === void 0 ? void 0 : arg.map((value) => {
        if (value !== null && value !== undefined) {
            concated += value;
        }
    });
    return concated;
}
exports.concatValues = concatValues;
function ensureStringArray(value) {
    if (value && !Array.isArray(value)) {
        return [value];
    }
    else if (value && Array.isArray(value)) {
        return value;
    }
    return [];
}
exports.ensureStringArray = ensureStringArray;
function queryStringify(obj, useQm = false) {
    let qs = useQm ? '?' : '';
    if (!isEmpty(obj)) {
        const keys = Object.keys(obj);
        keys.forEach((key) => {
            qs += `${key}=${encodeURIComponent(obj[key] + '' || '')}&`;
        });
        qs = qs.replace(/&$/, '');
    }
    return qs;
}
exports.queryStringify = queryStringify;
function base64urlToBase64(base64url) {
    return base64url
        .replace(/-/g, '+')
        .replace(/_/g, '/');
}
exports.base64urlToBase64 = base64urlToBase64;
function base64ToUtf8(base64) {
    return Buffer.from(base64, 'base64').toString('utf-8');
}
exports.base64ToUtf8 = base64ToUtf8;
function base64urlToUtf8(base64url) {
    const base64String = base64urlToBase64(base64url);
    return base64ToUtf8(base64String);
}
exports.base64urlToUtf8 = base64urlToUtf8;
//# sourceMappingURL=text.util.js.map