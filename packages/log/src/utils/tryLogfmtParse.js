const logfmt = require('logfmt');

export const tryLogfmtParse = (str, defaultValue = str) => {
  try {
    if (typeof str !== 'string') return str;
    if (!str.trim()) return defaultValue;
    return logfmt.parse(str);
  } catch (err) {
    return defaultValue;
  }
};

export default tryLogfmtParse;
