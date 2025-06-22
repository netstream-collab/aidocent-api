import ChatHisDAL from '../dal/layers/chatHis.dal';
import ProjDAL from '../dal/layers/proj.dal';
export declare class AuthService {
    private projDAL;
    private chatHisDAL;
    constructor(projDAL: ProjDAL, chatHisDAL: ChatHisDAL);
    validateRestApiKey(restApiKey: string): Promise<import("../dal/dto/proj.dto").IProj>;
}
