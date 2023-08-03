import { isClass } from './isClass';
import { undefault } from './undefault';

export const importFn = async (fn: any): Promise<any> => {
  const pack = await (typeof fn === 'function' && !isClass(fn) ? fn() : fn);
  if (!Array.isArray(pack)) return undefault(pack);
  const [fn2, ...args] = pack;
  return [await importFn(fn2), ...args];
};

export default importFn;
