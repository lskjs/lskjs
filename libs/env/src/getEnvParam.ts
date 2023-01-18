/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import getEnvVar from './getEnvVar';
import { tryParamParse } from './tryParamParse';

export const getEnvParam = (name: string, def: any = null): any =>
  tryParamParse(getEnvVar(name), def);

export default getEnvParam;
