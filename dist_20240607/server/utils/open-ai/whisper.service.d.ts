/// <reference types="multer" />
export declare class WhisperService {
    private logger;
    private readonly REST_KEY;
    private readonly model;
    constructor();
    transcriptions(file: Express.Multer.File): Promise<any>;
}
