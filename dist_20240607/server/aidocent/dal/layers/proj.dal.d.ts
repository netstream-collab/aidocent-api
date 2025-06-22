import { Connection, EntityManager, Repository } from 'typeorm';
import { TB_PROJ } from '../entities/TB_PROJ.entity';
import { IProj } from '../dto/proj.dto';
export default class ProjDAL {
    private readonly connection;
    private projRepo;
    private logger;
    constructor(connection: Connection, projRepo: Repository<TB_PROJ>);
    setRepository(_m: EntityManager): void;
    resetRepository(): void;
    private convertResult;
    private sample;
    create(createOpt: IProj): Promise<IProj>;
    findOne(projId: number): Promise<IProj>;
    findOneByRestApiKey(restApiKey: string): Promise<IProj>;
    validate(projId: number): Promise<IProj>;
    findAll(): Promise<IProj[]>;
    update(projId: number, updateOpt: Partial<IProj>): Promise<IProj>;
    updateRestApiKey(projId: number, restApiKey: string): Promise<number>;
}
