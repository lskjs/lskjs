import tryJSONparse from '@lskjs/utils/tryJSONparse';

const tryParamParse = (str, defaultParam) => {
  if (typeof str !== 'string') return defaultParam;
  const value = tryJSONparse(str);
  if (value === undefined) return defaultParam;
  return value;
};

export default tryParamParse;
