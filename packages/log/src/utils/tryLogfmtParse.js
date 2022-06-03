import { countBy } from './countBy';

const logfmt = require('logfmt');

export const tryLogfmtParse = (str, defaultValue = str) => {
  try {
    if (typeof str !== 'string') return str;
    if (!str.trim()) return defaultValue;
    const res = logfmt.parse(str);
    if (Object.keys(res).length < 2 || countBy(res, (a) => a === true) >= Object.keys(res).length / 2) {
      return defaultValue;
    }
    return res;
  } catch (err) {
    return defaultValue;
  }
};

export default tryLogfmtParse;
