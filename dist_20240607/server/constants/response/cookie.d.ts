import { CookieOptions, Response } from 'express';
export declare class Cookie {
    private static logger;
    constructor();
    static set(response: Response, key: string, value: string, option?: CookieOptions): void;
    static bulkSet(response: Response, key: string, value: string, domains: string[], option?: Omit<CookieOptions, 'domain'>): void;
}
