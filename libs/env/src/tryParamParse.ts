import { tryJSONparse } from './tryJSONparse';

export const tryParamParse = (str: any, defaultParam: any) => {
  if (str == null || str === '') return defaultParam;
  if (typeof str !== 'string') return str;
  const value = tryJSONparse(str);
  if (value === undefined) {
    if (str[0] === '{' || str[0] === '[') return defaultParam;
    return str;
  }
  return value;
};

export default tryParamParse;
