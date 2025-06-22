import { ConsoleLogger } from '@nestjs/common';
export declare class CustomLogger extends ConsoleLogger {
    constructor();
    private temporaryContext;
    private getTraceId;
    private getPrefix;
    name(context: string): this;
    debug(...args: any[]): void;
    log(...args: any[]): void;
    info(...args: any[]): void;
    verbose(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    healthCheck(...args: any[]): void;
    sql(...args: any[]): void;
    write(level: 'log' | 'warn' | 'info', message: any): void;
    private getContextFromArgs;
    private initConsole;
}
