"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupArrayByKey = exports.jsonToPlain = exports.classToObjectByKeys = exports.classToObject = exports.getObjectIfKeyExists = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function getObjectIfKeyExists(object, key, defaultValue) {
    let result = null;
    if (object && object[key]) {
        result = object;
    }
    return result || defaultValue;
}
exports.getObjectIfKeyExists = getObjectIfKeyExists;
function classToObject(classValue, ...exceptionKeys) {
    const originalClass = classValue || {};
    const keys = Object.keys(originalClass);
    return keys.reduce((classAsObj, key) => {
        if (!exceptionKeys.includes(key)) {
            classAsObj[key] = originalClass[key];
        }
        return classAsObj;
    }, {});
}
exports.classToObject = classToObject;
function classToObjectByKeys(classValue, ...getKeys) {
    const originalClass = classValue || {};
    const keys = Object.keys(originalClass);
    return keys.reduce((classAsObj, key) => {
        if (getKeys.includes(key)) {
            classAsObj[key] = originalClass[key];
        }
        return classAsObj;
    }, {});
}
exports.classToObjectByKeys = classToObjectByKeys;
function jsonToPlain(cls, json, excludeUndef) {
    if ((0, class_validator_1.isEmpty)(json))
        return null;
    const classItem = new cls();
    Object.keys(json).map((key) => (classItem[key] = json[key]));
    const result = (0, class_transformer_1.instanceToPlain)(classItem, {
        exposeUnsetFields: true,
        excludeExtraneousValues: true,
    });
    if (excludeUndef) {
        Object.keys(result).map((key) => result[key] === undefined && delete result[key]);
    }
    return result;
}
exports.jsonToPlain = jsonToPlain;
function groupArrayByKey(arr, idKey, groupByKey, groupKey) {
    const result = [];
    if (!Array.isArray(arr)) {
        return result;
    }
    const newGroupKey = groupKey || groupByKey;
    arr === null || arr === void 0 ? void 0 : arr.forEach((item) => {
        const exResultItem = result.find((exItem) => exItem[idKey] === item[idKey]);
        if (exResultItem) {
            exResultItem[newGroupKey].push(item[groupByKey]);
        }
        else {
            const newItem = Object.assign(Object.assign({}, item), { [idKey]: item[idKey], [newGroupKey]: [item[groupByKey]] });
            delete newItem[groupByKey];
            result.push(newItem);
        }
    });
    return result;
}
exports.groupArrayByKey = groupArrayByKey;
//# sourceMappingURL=object.util.js.map