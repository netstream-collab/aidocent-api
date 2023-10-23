import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, In, Not, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TB_CHAT_HIS } from '../entities/TB_CHAT_HIS.entity';
import { IChatHis, IGptMessageFromChat } from '../dto/chatHis.dto';
import { setDotProps } from 'src/server/utils/common/dbRawData.util';
import { getNow } from 'src/server/utils/common/date.util';
import { createUUID } from 'src/server/utils/common/text.util';
import { jsonToPlain } from 'src/server/utils/common/object.util';

@Injectable()
export default class ChatHisDAL {
  private logger = new Logger(ChatHisDAL.name);

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectRepository(TB_CHAT_HIS) private chatHisRepo: Repository<TB_CHAT_HIS>,
  ) {}

  setRepository(_m: EntityManager) {
    this.chatHisRepo = _m.getRepository(TB_CHAT_HIS);
  }

  resetRepository() {
    this.chatHisRepo = this.connection.getRepository(TB_CHAT_HIS);
  }

  private convertResult(result: any[]): IChatHis[];
  private convertResult(result: any): IChatHis;
  private convertResult(result: any | any[]): IChatHis[] | IChatHis {
    return plainToInstance(IChatHis, result, {
      excludeExtraneousValues: true,
    });
  }

  private async sample() {
    const man = this.chatHisRepo.manager;
    const sql = ``;
    const param = {};
    const [q, p] = man.connection.driver.escapeQueryWithParameters(sql, param, {});
    const result = setDotProps(await man.query(q, p));
    return result;
  }

  async create(createOpt: IChatHis) {
    const nowDate = getNow();
    const result = await this.chatHisRepo.save({
      nPROJ_ID: createOpt.projId,
      sUUID: createUUID(),
      sCONVO_SESSION_ID: createOpt.convoSessionId,
      cTYPE: createOpt.type,
      cSTATUS: createOpt.status,
      cSPEAKER_ROLE: createOpt.speakerRole,
      tCONTENT: createOpt.content,
      tERROR_MSG: createOpt.errorMsg || '',
      cRES_TYPE: createOpt.resType || '',
      dCREATE: nowDate,
      dUPDATE: nowDate,
    });
    return this.convertResult(result);
  }

  async bulkCreate(createOpts: IChatHis[]) {
    const nowDate = getNow();
    const values = createOpts?.map((json) => jsonToPlain(IChatHis, { ...json, createDate: nowDate, updateDate: nowDate }));
    this.logger.log('values: ', values);
    await this.chatHisRepo.createQueryBuilder().insert().into(TB_CHAT_HIS).values(values).execute();
  }

  async findByConviSessionId(convoSessionId: string, limit = 10) {
    const result = await this.chatHisRepo.find({
      where: {
        sCONVO_SESSION_ID: convoSessionId,
      },
      order: {
        nCHAT_ID: 'DESC',
      },
      take: limit,
    });
    return this.convertResult(result) || [];
  }

  async findByConviSessionIdForGpt(projId: number, convoSessionId: string, limit = 10) {
    const result = await this.chatHisRepo.find({
      where: {
        nPROJ_ID: projId,
        sCONVO_SESSION_ID: convoSessionId,
      },
      order: {
        nCHAT_ID: 'DESC',
      },
      take: limit,
    });
    return plainToInstance(IGptMessageFromChat, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAllConvoSessionIdOfProject(projId: number) {
    const result = await this.chatHisRepo
      .createQueryBuilder('chatHis')
      .select('*')
      .where('chatHis.nPROJ_ID = :projId', {
        projId: projId,
      })
      .orderBy('chatHis.nCHAT_ID', 'DESC')
      .groupBy('chatHis.sCONVO_SESSION_ID')
      .getRawMany();
    return this.convertResult(result);
  }
}
