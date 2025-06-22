import { CSEquery } from './custom-search-json.type';
export declare class CustomSearchJsonService {
    private readonly ApiKey;
    private readonly MainCX;
    constructor();
    search(query: string, option?: CSEquery): Promise<any>;
    format(items: any[]): {}[];
}
