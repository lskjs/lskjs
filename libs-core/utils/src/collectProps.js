import collectProp from './collectProp';

export default (obj, names = []) => {
  const res = {};
  names.forEach((name) => {
    res[name] = collectProp(obj, name);
  });
  return res;
};
