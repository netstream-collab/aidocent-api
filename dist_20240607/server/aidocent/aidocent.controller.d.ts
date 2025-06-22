/// <reference types="multer" />
import { AidocentService } from './aidocent.service';
import { ChatAskToAiByVoiceDTO, ChatAskToAiDTO } from './dto/chat-ask-to-ai.dto';
import { ProjCreateDTO } from './dto/proj-create.dto';
import { ProjUpdateDTO } from './dto/proj-update.dto';
import { SearchTagsSummaryDTO } from './dto/search-tags-summary.dto';
export declare class AidocentController {
    readonly aidocentService: AidocentService;
    constructor(aidocentService: AidocentService);
    searchTest(): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    getAllProject(): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    createNewProject(body: ProjCreateDTO): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    getOneProjectInfo(projId: number): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    updateProjectInfo(projId: number, body: ProjUpdateDTO): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    deleteOneProject(projId: number): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    renewRestApiKeyOfProject(projId: number): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    getAllConvoOfProject(projId: number): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    getAllChatsOfConvoSession(convoSessionId: string): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    searchTagsSummary(response: any, body: SearchTagsSummaryDTO): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    getProjectInfoByRestApiKey(project: any): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    startNewConversation(response: any, projId: number): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    askToAiWithProject(res: any, body: ChatAskToAiDTO, project: any): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
    askToAiWithProjectByStreaming(res: any, body: ChatAskToAiDTO, project: any): Promise<void>;
    askToAiWithProjectReturnTTS(res: any, body: ChatAskToAiDTO, project: any): Promise<void>;
    askToAiWithProjectByVoice(res: any, body: ChatAskToAiByVoiceDTO, project: any, questionVoiceFile: Express.Multer.File): Promise<import("../constants/response/basicResponse").BasicResponse<unknown>>;
}
