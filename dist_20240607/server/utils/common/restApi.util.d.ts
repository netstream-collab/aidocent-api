type TMethod = 'get' | 'post' | 'fetch' | 'delete' | 'GET' | 'POST' | 'FETCH' | 'DELETE';
export default class RestApi {
    static request(method: TMethod, url: string, body?: any, headers?: any, getRawRes?: boolean): Promise<any>;
    static requestStream(method: TMethod, url: string, body?: any, headers?: any): Promise<import("axios").AxiosResponse<any, any>>;
}
export {};
