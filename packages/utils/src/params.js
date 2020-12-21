import round from 'lodash/round';
import tryParamParse from './tryParamParse';

export const toBoolean = (a, def = false) => Boolean(tryParamParse(a, def));
export const toNumber = (a, def = 0) => Number(tryParamParse(a, def));
export const toInt = (a, def = 0) => round(tryParamParse(a, def));

export default {
  toBoolean,
  toNumber,
  toInt,
};
