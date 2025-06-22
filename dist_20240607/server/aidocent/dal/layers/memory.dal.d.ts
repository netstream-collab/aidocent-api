import { Repository } from 'typeorm';
import { TB_MEMORY } from '../entities/TB_MEMORY.entity';
import { IMemory } from '../dto/memory.dto';
export default class MemoryDal {
    private memoryRepository;
    constructor(memoryRepository: Repository<TB_MEMORY>);
    findByConviSessionId(convoSessionId: string): Promise<IMemory[]>;
    create(memoryOpt: IMemory): Promise<IMemory>;
    private convertResult;
}
