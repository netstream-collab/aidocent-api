export declare class ClovaVoiceService {
    constructor();
    private readonly RequestUrl;
    private readonly ClientId;
    private readonly ClientSecret;
    makeTTS(text: string): Promise<import("axios").AxiosResponse<any, any>>;
    makeTTS_v2(text: string): Promise<any>;
    queryStringify(obj: any): string;
}
