import { TResultCodeData } from '../resultCode';
export declare class BasicResponse<T> {
    private _status;
    private _resultCode;
    private _message;
    private _error?;
    private _data;
    constructor(status?: number, resultCode?: string, message?: string, error?: string, data?: T);
    get(key: any): any;
    getStatus(): number;
    getError(key?: string): any;
    status(status: number): this;
    resultCode(code: string): any;
    resultCode(code: TResultCodeData): any;
    message(message: string): this;
    error(error: string): this;
    data<O extends T>(data?: O): this;
    getData(): T;
    toJSON(): {
        status: number;
        resultCode: string;
        message: string;
        error: string;
        data: {};
    };
}
