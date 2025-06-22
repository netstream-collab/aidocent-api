import { ManipulateType } from 'dayjs';
export declare const DefaultDateFormat: "YYYY-MM-DD HH:mm:ss";
export type TDateUnit = 's' | 'm' | 'h' | 'd' | 'M' | 'y' | 'W';
export declare function getNow(format?: string): string;
export declare function getDateDiff(d1: Date | string, d2: Date | string, unit?: ManipulateType): number;
export declare function addDate(startDate: Date | string, diff: number, unit: ManipulateType, format?: string): string;
export declare function subDate(startDate: Date | string, diff: number, unit: ManipulateType, format?: string): string;
export declare function reformatDate(oriDate: Date | string, format?: string): string;
