import importFn from './importFn';

export default (fn) => async (...params) => {
  const action = await importFn(fn);
  return action(...params);
};
