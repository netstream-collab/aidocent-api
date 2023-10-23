import { ClassConstructor, instanceToPlain } from 'class-transformer';
import { isEmpty } from 'class-validator';
import _l from 'src/server/constants/logger/CommonLogger';

/**
 * bject에서 특정 키가 있으면 object를 리턴하고 아닐 경우에 null을 리턴한다.
 * @param object
 * @param key
 * @returns
 */
export function getObjectIfKeyExists<T extends object>(object: T, key: string, defaultValue?: any): T | void {
  let result = null;
  if (object && object[key]) {
    result = object;
  }
  return result || defaultValue;
}

/**
 * Class를 Object로 변환한다.
 * @param classValue
 * @param exceptionKeys 오브젝트 변환에 제외할 key 값들
 * @returns
 */
export function classToObject(classValue: any, ...exceptionKeys: string[]) {
  const originalClass = classValue || {};
  const keys = Object.keys(originalClass);
  return keys.reduce((classAsObj, key) => {
    if (!exceptionKeys.includes(key)) {
      classAsObj[key] = originalClass[key];
    }
    return classAsObj;
  }, {});
}
/**
 * Class를 Object로 변환한다.
 * @param classValue
 * @param getKeys 오브젝트 변환에 포함할 key 값들
 * @returns
 */
export function classToObjectByKeys(classValue: any, ...getKeys: string[]) {
  const originalClass = classValue || {};
  const keys = Object.keys(originalClass);
  return keys.reduce((classAsObj, key) => {
    if (getKeys.includes(key)) {
      classAsObj[key] = originalClass[key];
    }
    return classAsObj;
  }, {});
}

/**
 * json object 값을 DB entity key 값으로 변형하고 싶을때 사용한다.
 * - class-transformer에 사용한 class 를 넘겨야한다.
 * @param cls
 * @param json
 * @param excludeUndef undefined 값을 지울지 여부
 * @returns
 */
export function jsonToPlain(cls: ClassConstructor<unknown>, json: Record<string, any>, excludeUndef?: boolean): Record<string, any> {
  if (isEmpty(json)) return null;
  const classItem = new cls();
  Object.keys(json).map((key) => (classItem[key] = json[key]));
  const result = instanceToPlain(classItem, {
    exposeUnsetFields: true,
    excludeExtraneousValues: true,
  });
  if (excludeUndef) {
    Object.keys(result).map((key) => result[key] === undefined && delete result[key]);
  }
  return result;
}

/**
 * idKey를 기준으로 groupKey값들을 배열로 모은다.
 * @example
 * ```
 * const a = [
 *   { keyA: 'a1', keyB: 2 },
 *   { keyA: 'a1', keyB: 3 },
 *   { keyA: 'b1', keyB: 'x' },
 *   { keyA: 'b1', keyB: 'y' }
 * ];
 * const result = groupArrayByKey(a, 'keyA', 'keyB' , 'New');
 * const b = [{
 *  { keyA: 'a1', New: [2, 3] },
 *  { keyA: 'b1', New: ['x', 'y'] },
 * }]
 * ```
 * @param arr 원본 데이터 배열
 * @param idKey 부모 객체가 될 식별 값
 * @param groupByKey 그룹화할 값의 key 값
 * @param groupKey 새롭게 그룹화된 배열의 key 값
 *
 * @returns
 */
export function groupArrayByKey(arr: any[], idKey: string, groupByKey: string, groupKey?: string) {
  const result = [];
  if (!Array.isArray(arr)) {
    return result;
  }
  const newGroupKey = groupKey || groupByKey;
  arr?.forEach((item) => {
    const exResultItem = result.find((exItem) => exItem[idKey] === item[idKey]);
    if (exResultItem) {
      exResultItem[newGroupKey].push(item[groupByKey]);
    } else {
      const newItem = {
        ...item,
        [idKey]: item[idKey],
        [newGroupKey]: [item[groupByKey]],
      };
      delete newItem[groupByKey];
      result.push(newItem);
    }
  });
  return result;
}
