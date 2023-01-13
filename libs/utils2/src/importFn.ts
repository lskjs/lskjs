import isClass from './isClass';
import isFunction from './isFunction';
import { undefault } from './undefault';

const importFn = async (fn: any): Promise<any> => {
  const pack = await (isFunction(fn) && !isClass(fn) ? fn() : fn);
  if (!Array.isArray(pack)) return undefault(pack);
  const [fn2, ...args] = pack;
  return [await importFn(fn2), ...args];
};

export default importFn;
