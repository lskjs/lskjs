import difference from 'lodash/difference';
import baseIncludes from 'lodash/includes';
import isMatch from 'lodash/isMatch';
import isPlainObject from 'lodash/isPlainObject';
import some from 'lodash/some';

import { isRegExp } from './isRegExp';

type IObject = {
  [key: string]: any;
};

type IValuesType = number | string | null | undefined | symbol | RegExp | IObject | Array<any>;

const _includes = (func: any, collection: Array<any>, values: IValuesType): boolean => {
  let [_collection, _values] = [collection, values];

  if (!Array.isArray(_collection)) _collection = [_collection];
  if (!Array.isArray(_values)) _values = [_values];

  return _values[func]((value: any) => {
    if (isRegExp(value)) {
      return some(_collection, (elem) => value.test(elem));
    }
    if (isPlainObject(value)) {
      return some(_collection, (elem) => isMatch(elem, value));
    }
    // TODO: Array.isArray(value) {}
    return baseIncludes(_collection, value);
  });
};

// Includes all values by collection
export const includes = (collection: Array<any>, values: IValuesType): boolean =>
  _includes('every', collection, values);

// Includes some values by collection
export const includesOne = (collection: Array<any>, values: IValuesType): boolean =>
  _includes('some', collection, values);

export default includes;
