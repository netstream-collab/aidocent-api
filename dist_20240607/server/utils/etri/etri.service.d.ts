/// <reference types="node" />
type TEtriSTTLanguageCode = 'korean' | 'english' | 'japanese' | 'chinese' | 'spanish' | 'french' | 'german' | 'russian' | 'vietnam' | 'arabic' | 'thailand' | 'portuguese';
type TEtriSTTResponse = {
    request_id: string;
    result: number | string;
    return_object?: {
        recognized: string;
    };
    reason?: string | any;
};
export declare class EtriService {
    constructor();
    private readonly API_KEY;
    stt(fileBuffer: Buffer, languageCode?: TEtriSTTLanguageCode): Promise<TEtriSTTResponse>;
}
export {};
