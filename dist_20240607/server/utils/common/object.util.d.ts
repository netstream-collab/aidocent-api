import { ClassConstructor } from 'class-transformer';
export declare function getObjectIfKeyExists<T extends object>(object: T, key: string, defaultValue?: any): T | void;
export declare function classToObject(classValue: any, ...exceptionKeys: string[]): {};
export declare function classToObjectByKeys(classValue: any, ...getKeys: string[]): {};
export declare function jsonToPlain(cls: ClassConstructor<unknown>, json: Record<string, any>, excludeUndef?: boolean): Record<string, any>;
export declare function groupArrayByKey(arr: any[], idKey: string, groupByKey: string, groupKey?: string): any[];
