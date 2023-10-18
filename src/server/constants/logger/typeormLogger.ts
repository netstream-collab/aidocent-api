import { Logger, QueryRunner } from 'typeorm';
import _l from './CommonLogger';
import { isEmpty } from 'src/server/utils/common/text.util';

export default class TypeormLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    _l.name('SQL').sql(query);

    if (!isEmpty(parameters)) {
      _l.name('SQL').sql(`parameters[${parameters.toString()}]`);
    }
    return;
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    return;
  }
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    return;
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    _l.name('SQL').info(message);
    return;
  }
  logMigration(message: string, queryRunner?: QueryRunner) {
    return;
  }
  log(level: 'log' | 'warn' | 'info', message: any, queryRunner?: QueryRunner) {
    _l.name('SQL').write(level, message);
  }
}
