import tryJSONparse from '@lskjs/utils/tryJSONparse';

const tryParamParse = (str, defaultParam) => {
  const value = tryJSONparse(str);
  if (value === undefined) return defaultParam;
  return value;
};

export default tryParamParse;
