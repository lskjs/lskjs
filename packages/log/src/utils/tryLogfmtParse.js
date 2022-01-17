import { every } from './every';

const logfmt = require('logfmt');

export const tryLogfmtParse = (str, defaultValue = str) => {
  try {
    if (typeof str !== 'string') return str;
    if (!str.trim()) return defaultValue;
    const res = logfmt.parse(str);
    if (!Object.keys(res).length || every(res, (a) => a === true)) {
      return defaultValue;
    }
    return res;
  } catch (err) {
    return defaultValue;
  }
};

export default tryLogfmtParse;
