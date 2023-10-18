import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { ManipulateType } from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);

export const DefaultDateFormat = 'YYYY-MM-DD HH:mm:ss' as const;

/**
 * 현재 우리 서비스가 사용하고 있는 시간 shorthand unit 단위
 * s, m, h, d, M, y, Q,  W,
 * @link https://day.js.org/docs/en/manipulate/add
 */
export type TDateUnit = 's' | 'm' | 'h' | 'd' | 'M' | 'y' | 'W';

/**
 * 현재 시간 utc로 가져오기
 * - 기본 iso 포맷
 * @returns
 */
export function getNow(format?: string) {
  return dayjs.utc().format(format || DefaultDateFormat);
}

/**
 *  d1과 d2의 시간차이를 구한다.
 * @param d1
 * @param d2
 * @param unit 기본값으로 ms
 * @returns
 */
export function getDateDiff(
  d1: Date | string,
  d2: Date | string,
  unit?: ManipulateType,
) {
  return dayjs(d1).diff(d2, unit || 'ms');
}

/**
 * startDate에 diff만큼의 시간을 더한 값을 구한다.
 * @param startDate
 * @param diff
 * @param unit
 * @param format
 * @returns
 */
export function addDate(
  startDate: Date | string,
  diff: number,
  unit: ManipulateType,
  format?: string,
) {
  return dayjs(startDate)
    .add(diff, unit)
    .format(format || DefaultDateFormat);
}

/**
 * startDate에 diff만큼의 시간을 더한 값을 구한다.
 * @param startDate
 * @param diff
 * @param unit
 * @param format
 * @returns
 */
export function subDate(
  startDate: Date | string,
  diff: number,
  unit: ManipulateType,
  format?: string,
) {
  return dayjs(startDate)
    .subtract(diff, unit)
    .format(format || DefaultDateFormat);
}

export function reformatDate(oriDate: Date | string, format?: string) {
  return dayjs(oriDate).format(format || DefaultDateFormat);
}
