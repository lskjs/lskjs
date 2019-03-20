
import isEmpty from './isEmpty';

export default (obj = {}) => {
  const res = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (isEmpty(val)) return;
    res[key] = val;
  });
  return res;
};

