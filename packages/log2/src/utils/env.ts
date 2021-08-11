import { tryParamParse } from './tryParamParse';

export const env = (name: string, def: any = null): any => {
  // eslint-disable-next-line no-nested-ternary
  const envs = typeof process !== 'undefined' ? process.env : typeof window !== 'undefined' ? window : {};
  return tryParamParse(envs[name], def);
};

export default env;
