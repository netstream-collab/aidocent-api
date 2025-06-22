import { Logger, QueryRunner } from 'typeorm';
export default class TypeormLogger implements Logger {
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): void;
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): void;
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): void;
    logSchemaBuild(message: string, queryRunner?: QueryRunner): void;
    logMigration(message: string, queryRunner?: QueryRunner): void;
    log(level: 'log' | 'warn' | 'info', message: any, queryRunner?: QueryRunner): void;
}
