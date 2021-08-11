import isClass from './isClass';
import isFunction from './isFunction';
import undefault from './undefault';
// import typeChecks from './typeChecks';
// console.log('importFn2', fn, typeChecks(fn), Object.keys(fn), new String(fn), fn.name, fn.type, JSON.stringify(fn), fn.prototype, typeChecks(fn.prototype));

const importFn = async (fn) => {
  const pack = await (isFunction(fn) && !isClass(fn) ? fn() : fn);
  if (!Array.isArray(pack)) return undefault(pack);
  const [fn2, ...args] = pack;
  return [await importFn(fn2), ...args];
};

export default importFn;
