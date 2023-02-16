import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';

export default function getQueryFromParams(params = {}, defaultParams) {
  return Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => {
      const val = params[key];
      if (isPlainObject(val) && isEmpty(val)) return null;
      if (defaultParams && isEqual(val, defaultParams[key])) return null;
      if (val === null) return null;
      const val2 = typeof val === 'string' ? val : JSON.stringify(val);
      return [key, val2].join('=');
    })
    .filter((a) => a)
    .join('&');
}
