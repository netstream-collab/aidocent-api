import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, In, Not, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TB_CHAT_HIS } from '../entities/TB_CHAT_HIS.entity';
import { IChatHis } from '../dto/chatHis.dto';
import { setDotProps } from 'src/server/utils/common/dbRawData.util';
import { getNow } from 'src/server/utils/common/date.util';
import { createUUID } from 'src/server/utils/common/text.util';
import { jsonToPlain } from 'src/server/utils/common/object.util';
import { TB_PROJ } from '../entities/TB_PROJ.entity';
import { IProj } from '../dto/proj.dto';

@Injectable()
export default class ProjDAL {
  private logger = new Logger(ProjDAL.name);

  constructor(@InjectConnection() private readonly connection: Connection, @InjectRepository(TB_PROJ) private projRepo: Repository<TB_PROJ>) {}

  setRepository(_m: EntityManager) {
    this.projRepo = _m.getRepository(TB_PROJ);
  }

  resetRepository() {
    this.projRepo = this.connection.getRepository(TB_PROJ);
  }

  private convertResult(result: any[]): IProj[];
  private convertResult(result: any): IProj;
  private convertResult(result: any | any[]): IProj[] | IProj {
    return plainToInstance(IProj, result, {
      excludeExtraneousValues: true,
    });
  }

  private async sample() {
    const man = this.projRepo.manager;
    const sql = ``;
    const param = {};
    const [q, p] = man.connection.driver.escapeQueryWithParameters(sql, param, {});
    const result = setDotProps(await man.query(q, p));
    return result;
  }

  async create(createOpt: IProj) {
    const nowDate = getNow();
    const result = await this.projRepo.save({
      sUUID: createUUID(),
      sNAME: createOpt.name,
      sDESCRIPTION: createOpt.description,
      cSTATUS: createOpt.status,
      tUSER_PROMPT: createOpt.userPrompt,
      tMEMO: createOpt.memo,
      sREST_API_KEY: 'api-key-test',
      createDate: nowDate,
      updateDate: nowDate,
    });
    return this.convertResult(result);
  }

  async findOne(projId: number) {
    const result = this.projRepo.findOne({
      where: {
        nPROJ_ID: projId,
      },
      order: {
        nPROJ_ID: 'DESC',
      },
    });
    return this.convertResult(result);
  }
}
