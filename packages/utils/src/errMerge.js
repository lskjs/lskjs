import isPlainObject from 'lodash/isPlainObject';

export default function errMerge(params1, params2, params3) {
  const params = {};
  if (typeof params1 === 'string') {
    params.code = params1;
  }
  if (typeof params2 === 'string') {
    params.message = params2;
  }
  return {
    ...params,
    ...(isPlainObject(params1) ? params1 : {}),
    ...(isPlainObject(params2) ? params2 : {}),
    ...(isPlainObject(params3) ? params3 : {}),
  };
}
