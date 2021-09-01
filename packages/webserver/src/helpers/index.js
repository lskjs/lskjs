import { getReqIp } from './getReqIp';
import { getReqLocales } from './getReqLocales';
import { getReqToken } from './getReqToken';
import { isReqAuth } from './isReqAuth';

export * from './getReqIp';
export * from './getReqLocales';
export * from './getReqToken';
export * from './isReqAuth';

export default {
  getReqIp,
  getReqLocales,
  getReqToken,
  isReqAuth,
};
