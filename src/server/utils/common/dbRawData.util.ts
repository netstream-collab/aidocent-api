import { isEmpty } from './text.util';
import * as set from 'set-value';

/**
 *
 * @param value
 * @returns
 */
export function setDotProps(value: any) {
  if (isEmpty(value)) return null;
  let result;
  if (Array.isArray(value)) {
    result = value.map((data) => setObjectDotProp(data));
  } else {
    result = setObjectDotProp(value);
  }
  return result;
}

/**
 *
 * @param obj
 * @returns
 */
export function setObjectDotProp(obj) {
  if (!obj) return;
  const result = {};
  const keys = Object.keys(obj);
  for (const key of keys) {
    set(result, key, obj[key]);
  }
  return result;
}
