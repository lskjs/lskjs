import isPlainObject from 'lodash/isPlainObject';

export default (key = '', val) => {
  let method;
  if (isPlainObject(val) || Array.isArray(val)) method = 'use';
  const chunk = key.trim().split(' ');
  let path;
  if (chunk.length >= 2) {
    [method, path] = chunk;
  } else {
    [path] = chunk;
  }
  if (!method) method = 'all';
  return {
    path,
    method: method.toLowerCase(),
  };
};
