/// <reference types="multer" />
export declare class ClovaCSRService {
    private readonly RequestUrl;
    private readonly ClientId;
    private readonly ClientSecret;
    constructor();
    stt(file: Express.Multer.File): Promise<any>;
}
