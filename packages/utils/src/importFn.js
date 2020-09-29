import undefault from './undefault';
import isFunction from './isFunction';

export default async (fn) => {
  let module;
  if (isFunction(fn)) {
    module = await fn();
  } else {
    module = await fn;
  }
  return undefault(module);
};
