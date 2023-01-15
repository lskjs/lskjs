/* global window */
import { isTTY } from '@lskjs/tty';

// import { getEnvVar } from './getEnvVar';

// @ts-ignore
const safeWindow: any = typeof window !== 'undefined' ? window : null;

// @ts-ignore
export const isServer = typeof window === 'undefined';
export const isClient = !isServer;
export const isDev =
  (isServer
    ? process.env.NODE_ENV !== 'production'
    : Boolean(safeWindow?.__DEV__)) || false;
export const isProd = !isDev;
export const isDebug = isDev;
export { isTTY };

// getEnvVar('STAGE', (isDev ? process.env.user : null))

export const stage =
  (isServer
    ? process.env.STAGE || (isDev ? process.env.user : null)
    : safeWindow?.env?.stage || safeWindow.__STAGE__) || 'development';

export const version =
  (isServer
    ? process.env.VERSION ||
      process.env.CI_COMMIT_SHORT_SHA ||
      process.env.CI_COMMIT_SHA
    : safeWindow?.env?.version) || stage;

export default {
  isServer,
  isClient,
  isDev,
  isProd,
  isDebug,
  stage,
  version,
  isTTY,
};
