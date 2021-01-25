import forEach from 'lodash/forEach';
import isObjectLike from 'lodash/isObjectLike';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import round from 'lodash/round';

import tryParamParse from './tryParamParse';

export const toBoolean = (a, def = false) => Boolean(tryParamParse(a, def));
export const toNumber = (a, def = 0) => Number(tryParamParse(a, def));
export const toInt = (a, def = 0) => round(tryParamParse(a, def));
export const toJson = (a, def = null) => (isObjectLike(a) ? a : tryParamParse(a, def));
export const toDate = (a, def = null) => (a ? new Date(a) || def : def);
export const parse = (a, type, def) => {
  if (type === 'boolean' || type === 'bool') return toBoolean(a, def);
  if (type === 'number') return toNumber(a, def);
  if (type === 'int') return toInt(a, def);
  if (type === 'json') return toJson(a, def);
  if (type === 'date') return toDate(a, def);
  return a;
};

export function params(obj, schema) {
  const res = mapValues(obj, (value, key) => {
    const strOrObj = schema[key];
    let type;
    let def;
    if (typeof strOrObj === 'string') {
      type = strOrObj;
    } else if (isPlainObject(strOrObj)) {
      ({ type, default: def } = strOrObj);
    } else {
      return value;
    }
    return parse(value, type, def);
  });
  forEach(schema, (strOrObj, key) => {
    let def;
    if (isPlainObject(strOrObj)) {
      ({ default: def } = strOrObj);
    }
    if (def !== undefined && res[key] === undefined) res[key] = def;
  });
  return res;
}

params.toBoolean = toBoolean;
params.toNumber = toNumber;
params.toInt = toInt;
params.toJson = toJson;
params.parse = parse;

export default params;
