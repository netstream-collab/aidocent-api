import { Connection, EntityManager, Repository } from 'typeorm';
import { TB_CHAT_HIS } from '../entities/TB_CHAT_HIS.entity';
import { IChatHis, IGptMessageFromChat } from '../dto/chatHis.dto';
export default class ChatHisDAL {
    private readonly connection;
    private chatHisRepo;
    private logger;
    constructor(connection: Connection, chatHisRepo: Repository<TB_CHAT_HIS>);
    setRepository(_m: EntityManager): void;
    resetRepository(): void;
    private convertResult;
    private sample;
    create(createOpt: IChatHis): Promise<IChatHis>;
    bulkCreate(createOpts: IChatHis[]): Promise<void>;
    findByConviSessionId(convoSessionId: string, limit?: number): Promise<IChatHis[]>;
    findByConviSessionIdForGpt(projId: number, convoSessionId: string, limit?: number): Promise<IGptMessageFromChat[]>;
    findAllConvoSessionIdOfProject(projId: number): Promise<IChatHis[]>;
}
