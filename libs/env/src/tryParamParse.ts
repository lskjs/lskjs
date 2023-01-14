import tryJSONparse from './tryJSONparse';

const tryParamParse = (str: any, defaultParam: any) => {
  if (str == null || str === '') return defaultParam;
  if (typeof str !== 'string') {
    return str;
  }
  const value = tryJSONparse(str);
  if (value === undefined) return defaultParam;
  return value;
};

export default tryParamParse;
