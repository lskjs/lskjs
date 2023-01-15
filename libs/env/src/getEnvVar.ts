/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { tryParamParse } from './tryParamParse';

export const getEnvVar = (name: string, def: any = null): any => {
  // @ts-ignore
  // eslint-disable-next-line prettier/prettier
  const envs =  typeof process !== 'undefined' ? process.env : typeof window !== 'undefined' ? window : {};
  return tryParamParse(envs[name], def);
};

export default getEnvVar;
