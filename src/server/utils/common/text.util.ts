import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

/**
 * uuid 생성
 * - `-` 없이 문자열로만 이뤄진 uuid
 * - v4로 생성된다
 * @returns
 */
export function createUUID(): string {
  return uuidv4().replace(/-/gi, '');
}

export function isString(value: any): boolean {
  if (typeof value === 'string' || value instanceof String) {
    return true;
  }
  return false;
}
/**
 * 유효한 값이 있는지 판단
 * {}, [], '', null, undefined 모두 false
 * @param value 판단하고 싶은 값
 * @returns     {boolean}
 */
export function isEmpty(value: any): boolean {
  if (isString(value) && value == '') {
    return true;
  } else if (value == null || value == undefined || (value != null && typeof value == 'object' && !Object.keys(value).length)) {
    return true;
  } else {
    return false;
  }
}

export function convertStringToJson(value: any): any {
  try {
    if (isEmpty(value)) return null;
    return JSON.parse(value);
  } catch (error) {
    console.warn('<!> Convert string to json error: ', error);
    return null;
  }
}

export function convertObjectToJsonString(value: any): string {
  try {
    if (isEmpty(value)) return '';
    return JSON.stringify(value);
  } catch (error) {
    console.warn('<!> Convert object to jsonString error: ', error);
    return '';
  }
}

/**
 * 랜덤한 문자열 생성하기
 * - crypto로 생성한 byte를 base64url로 인코딩한다.
 * - 따라서 숫자, 영어, -, _ 가 랜덤하게 있는 문자열이 리턴된다.
 * @param length 20 이하
 * @returns
 */
export function createRandomString(length: number): string {
  if (length > 20 || length < 1) {
    throw new Error('"length" must be a positive number and no more than 20.');
  }
  const string = crypto.randomBytes(20).toString('base64url');
  return string.slice(0, length);
}

/**
 * 인자로 넘어온 값들을 합친 string을 리턴한다.
 * - 이때 만약 인자가 null이나 undefined일 경우엔 합치지 않고, 다음 인자로 넘어간다.
 * @example
 * ```
 * concatValue(null, 'jasmin');
 * // return: 'jasmin'
 * ```
 */
export function concatValues(...arg: any[]): string {
  let concated = '';
  arg?.map((value) => {
    if (value !== null && value !== undefined) {
      concated += value;
    }
  });
  return concated;
}

export function ensureStringArray(value: string | string[]): string[] {
  if (value && !Array.isArray(value)) {
    return [value];
  } else if (value && Array.isArray(value)) {
    return value;
  }
  return [];
}

/**
 * 오브젝트를 쿼리스트링로 바꾼다
 * @param obj
 * @param useQm 맨 처음에 물음표 쓸것인지
 *
 * @returns
 */
export function queryStringify(obj: any, useQm = false): string {
  let qs = useQm ? '?' : '';
  if (!isEmpty(obj)) {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      qs += `${key}=${encodeURIComponent(obj[key] + '' || '')}&`;
    });
    qs = qs.replace(/&$/, '');
  }
  return qs;
}

// 'base64url' to 'base64' 변환 함수
export function base64urlToBase64(base64url: string): string {
  return base64url
    .replace(/-/g, '+') // '-'를 '+'로 변환
    .replace(/_/g, '/'); // '_'를 '/'로 변환
}

export function base64ToUtf8(base64: string): string {
  return Buffer.from(base64, 'base64').toString('utf-8');
}

export function base64urlToUtf8(base64url: string): string {
  const base64String = base64urlToBase64(base64url);
  return base64ToUtf8(base64String);
}
