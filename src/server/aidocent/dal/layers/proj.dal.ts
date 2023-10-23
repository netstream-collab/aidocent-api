import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, In, Not, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TB_CHAT_HIS } from '../entities/TB_CHAT_HIS.entity';
import { IChatHis } from '../dto/chatHis.dto';
import { setDotProps } from 'src/server/utils/common/dbRawData.util';
import { getNow } from 'src/server/utils/common/date.util';
import { createUUID, isEmpty } from 'src/server/utils/common/text.util';
import { jsonToPlain } from 'src/server/utils/common/object.util';
import { TB_PROJ } from '../entities/TB_PROJ.entity';
import { IProj } from '../dto/proj.dto';
import Codes from 'src/server/constants/codes';

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
      sPROJ_CODE: createOpt.projCode,
      sNAME: createOpt.name,
      sDESCRIPTION: createOpt.description,
      cSTATUS: createOpt.status,
      tUSER_PROMPT: createOpt.userPrompt,
      tMEMO: createOpt.memo,
      sREST_API_KEY: '',
      dCREATE: nowDate,
      dUPDATE: nowDate,
    });
    return this.convertResult(result);
  }

  async findOne(projId: number) {
    const result = this.projRepo.findOne({
      where: {
        nPROJ_ID: projId,
      },
    });
    return this.convertResult(result);
  }

  async findOneByRestApiKey(restApiKey: string) {
    const result = this.projRepo.findOne({
      where: {
        sREST_API_KEY: restApiKey,
      },
    });
    return this.convertResult(result);
  }

  async validate(projId: number) {
    if (!projId) {
      throw new Error('none project');
    }
    const project = await this.findOne(projId);
    if (isEmpty(project)) {
      throw new Error('none project');
    } else if (project.status !== Codes.ProjectStatus.VALID) {
      throw new Error('invalid project');
    }
    return project;
  }

  async findAll() {
    const result = await this.projRepo.find();
    return this.convertResult(result);
  }

  async update(projId: number, updateOpt: Partial<IProj>) {
    const updateCondition = jsonToPlain(IProj, updateOpt);
    if (!isEmpty(updateOpt) && !isEmpty(updateCondition)) {
      await this.projRepo.update(
        {
          nPROJ_ID: projId,
        },
        {
          ...updateCondition,
          dUPDATE: getNow(),
        },
      );
    }

    return await this.findOne(projId);
  }

  async updateRestApiKey(projId: number, restApiKey: string) {
    const result = await this.projRepo.update(
      {
        nPROJ_ID: projId,
      },
      {
        sREST_API_KEY: restApiKey,
      },
    );
    return result.affected;
  }
}
