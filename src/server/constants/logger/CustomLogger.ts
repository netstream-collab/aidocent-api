import { ConsoleLogger } from '@nestjs/common';
import debug from 'debug';
import * as rTracer from 'cls-rtracer';
import { getNow } from 'src/server/utils/common/date.util';

const verboseLog = debug('aid:v');
const debugLog = debug('aid:d');
const logLog = debug('aid:l');
const infoLog = debug('aid:i');
const warnLog = debug('aid:w');
const errorLog = debug('aid:e');
const healthCheckLog = debug('aid:h');
const sqlLog = debug('aid:sql');

export class CustomLogger extends ConsoleLogger {
  constructor() {
    super();
    this.initConsole();
  }

  /**
   * 가변하는 임시 context
   * - context의 우선순위: temporaryContext > context
   */
  private temporaryContext: string;

  private getTraceId() {
    const rid = (rTracer.id() as string) || '';
    return rid.slice(0, 8);
  }

  private getPrefix() {
    const datetime = getNow('YYYY-MM-DD HH:mm:ss.SSS');
    const _context = this.temporaryContext || this.context || '';
    this.name('');
    return `${
      process.pid
    } - ${datetime} - ${this.getTraceId()} - [${_context}]`;
  }

  name(context: string) {
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

  write(level: 'log' | 'warn' | 'info', message: any) {
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

  private getContextFromArgs(args) {
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

  private initConsole() {
    verboseLog.color = '27';
    debugLog.color = '2';
    logLog.color = '27';
    infoLog.color = '6';
    warnLog.color = '11';
    errorLog.color = '9';
    healthCheckLog.color = '35';
    sqlLog.color = '35';

    // stdout
    verboseLog.log = console.log.bind(console);
    debugLog.log = console.log.bind(console);
    logLog.log = console.log.bind(console);
    infoLog.log = console.info.bind(console);
    healthCheckLog.log = console.info.bind(console);
    sqlLog.log = console.info.bind(console);

    // else stderr
    warnLog.log = console.warn.bind(console);
    errorLog.log = console.error.bind(console);
  }
}
