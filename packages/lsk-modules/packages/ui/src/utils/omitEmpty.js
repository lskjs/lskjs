
import isEmpty from './isEmpty';

export default (obj = {}) => {
  const res = {};
  Object.keys(obj).forEach((key) => {
    if (isEmpty(obj[key])) return;
    res[key] = obj[key];
  });
  return res;
};

