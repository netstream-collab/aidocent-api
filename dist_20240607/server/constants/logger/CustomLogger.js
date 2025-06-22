"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const common_1 = require("@nestjs/common");
const debug_1 = require("debug");
const rTracer = require("cls-rtracer");
const date_util_1 = require("../../utils/common/date.util");
const verboseLog = (0, debug_1.default)('aid:v');
const debugLog = (0, debug_1.default)('aid:d');
const logLog = (0, debug_1.default)('aid:l');
const infoLog = (0, debug_1.default)('aid:i');
const warnLog = (0, debug_1.default)('aid:w');
const errorLog = (0, debug_1.default)('aid:e');
const healthCheckLog = (0, debug_1.default)('aid:h');
const sqlLog = (0, debug_1.default)('aid:sql');
class CustomLogger extends common_1.ConsoleLogger {
    constructor() {
        super();
        this.initConsole();
    }
    getTraceId() {
        const rid = rTracer.id() || '';
        return rid.slice(0, 8);
    }
    getPrefix() {
        const datetime = (0, date_util_1.getNow)('YYYY-MM-DD HH:mm:ss.SSS');
        const _context = this.temporaryContext || this.context || '';
        this.name('');
        return `${process.pid} - ${datetime} - ${this.getTraceId()} - [${_context}]`;
    }
    name(context) {
        this.temporaryContext = context;
        return this;
    }
    debug(...args) {
        const { data } = this.getContextFromArgs(args);
        debugLog(this.getPrefix(), ...data);
    }
    log(...args) {
        const { data } = this.getContextFromArgs(args);
        logLog(this.getPrefix(), ...data);
    }
    info(...args) {
        const { data } = this.getContextFromArgs(args);
        infoLog(this.getPrefix(), ...data);
    }
    verbose(...args) {
        const { data } = this.getContextFromArgs(args);
        verboseLog(this.getPrefix(), ...data);
    }
    warn(...args) {
        const { data } = this.getContextFromArgs(args);
        warnLog(this.getPrefix(), ...data);
    }
    error(...args) {
        const { data } = this.getContextFromArgs(args);
        errorLog(this.getPrefix(), ...data);
    }
    healthCheck(...args) {
        const { data } = this.getContextFromArgs(args);
        healthCheckLog(this.getPrefix(), ...data);
    }
    sql(...args) {
        const { data } = this.getContextFromArgs(args);
        sqlLog(this.getPrefix(), ...data);
    }
    write(level, message) {
        switch (level) {
            case 'log':
                this.log(message);
                break;
            case 'warn':
                this.warn(message);
                break;
            case 'info':
                this.info(message);
                break;
        }
    }
    getContextFromArgs(args) {
        if ((args === null || args === void 0 ? void 0 : args.length) <= 1) {
            return { data: args, context: this.context };
        }
        const lastElement = args[args.length - 1];
        const isContext = typeof lastElement === 'string' ? lastElement : null;
        if (!isContext) {
            return { data: args, context: this.context };
        }
        super.setContext(lastElement);
        return {
            context: lastElement,
            data: args.slice(0, args.length - 1) || [],
        };
    }
    initConsole() {
        verboseLog.color = '27';
        debugLog.color = '2';
        logLog.color = '27';
        infoLog.color = '6';
        warnLog.color = '11';
        errorLog.color = '9';
        healthCheckLog.color = '35';
        sqlLog.color = '35';
        verboseLog.log = console.log.bind(console);
        debugLog.log = console.log.bind(console);
        logLog.log = console.log.bind(console);
        infoLog.log = console.info.bind(console);
        healthCheckLog.log = console.info.bind(console);
        sqlLog.log = console.info.bind(console);
        warnLog.log = console.warn.bind(console);
        errorLog.log = console.error.bind(console);
    }
}
exports.CustomLogger = CustomLogger;
//# sourceMappingURL=CustomLogger.js.map