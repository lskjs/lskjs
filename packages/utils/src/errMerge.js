import isObject from 'lodash/isObject';

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
    ...(isObject(params1) ? params1 : {}),
    ...(isObject(params2) ? params2 : {}),
    ...(isObject(params3) ? params3 : {}),
  };
}
