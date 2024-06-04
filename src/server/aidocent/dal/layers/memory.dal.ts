import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TB_MEMORY } from '../entities/TB_MEMORY.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IChatHis } from '../dto/chatHis.dto';
import { plainToInstance } from 'class-transformer';
import { IMemory } from '../dto/memory.dto';
import { getNow } from '../../../utils/common/date.util';

@Injectable()
export default class MemoryDal {
  constructor(@InjectRepository(TB_MEMORY) private memoryRepository: Repository<TB_MEMORY>) {}

  async findByConviSessionId(convoSessionId: string) {
    const result = await this.memoryRepository.find({
      where: {
        sCONVO_SESSION_ID: convoSessionId,
      },
      order: {
        nMEMORY_ID: 'desc',
      },
    });

    return this.convertResult(result);
  }

  async create(memoryOpt: IMemory) {
    const now = getNow();
    const result = await this.memoryRepository.save({
      sCONVO_SESSION_ID: memoryOpt.convoSessionId,
      tCONTENT: memoryOpt.content,
      nLAST_CHAT_ID: memoryOpt.lastChatId,
      dCREATE: now,
    });

    return this.convertResult(result);
  }

  private convertResult(result: any[]): IMemory[];
  private convertResult(result: any): IMemory;
  private convertResult(result: any | any[]): IMemory[] | IMemory {
    return plainToInstance(IMemory, result, {
      excludeExtraneousValues: true,
    });
  }
}
