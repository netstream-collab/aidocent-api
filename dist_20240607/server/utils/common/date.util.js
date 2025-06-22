"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reformatDate = exports.subDate = exports.addDate = exports.getDateDiff = exports.getNow = exports.DefaultDateFormat = void 0;
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
exports.DefaultDateFormat = 'YYYY-MM-DD HH:mm:ss';
function getNow(format) {
    return dayjs.utc().format(format || exports.DefaultDateFormat);
}
exports.getNow = getNow;
function getDateDiff(d1, d2, unit) {
    return dayjs(d1).diff(d2, unit || 'ms');
}
exports.getDateDiff = getDateDiff;
function addDate(startDate, diff, unit, format) {
    return dayjs(startDate)
        .add(diff, unit)
        .format(format || exports.DefaultDateFormat);
}
exports.addDate = addDate;
function subDate(startDate, diff, unit, format) {
    return dayjs(startDate)
        .subtract(diff, unit)
        .format(format || exports.DefaultDateFormat);
}
exports.subDate = subDate;
function reformatDate(oriDate, format) {
    return dayjs(oriDate).format(format || exports.DefaultDateFormat);
}
exports.reformatDate = reformatDate;
//# sourceMappingURL=date.util.js.map