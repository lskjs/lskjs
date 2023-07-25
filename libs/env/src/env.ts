/* global window */

// import { getEnvVar } from './getEnvVar';

// @ts-ignore
const safeWindow: any = typeof window !== 'undefined' ? window : null;

export const isServer = !safeWindow;
export const isClient = !isServer;
export const isDev = isServer
  ? process.env.NODE_ENV !== 'production'
  : Boolean(safeWindow?.__DEV__);
export const isProd = !isDev;
export const isDebug = isDev;
export const isTTY = Boolean(process?.stdout?.isTTY) || false;

// getEnvVar('STAGE', (isDev ? process.env.user : null))

export const stage =
  (isServer
    ? process.env.STAGE || (isDev ? process.env.user : null)
    : safeWindow?.env?.stage || safeWindow.__STAGE__) || 'development';

export const version =
  (isServer
    ? process.env.VERSION || process.env.CI_COMMIT_SHORT_SHA || process.env.CI_COMMIT_SHA
    : safeWindow?.env?.version) || stage;

const env = isServer ? process.env : {};
export const isCI =
  isServer &&
  env.CI !== 'false' &&
  !!(
    (
      env.BUILD_ID || // Jenkins, Cloudbees
      env.BUILD_NUMBER || // Jenkins, TeamCity
      env.CI || // Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari
      env.CI_APP_ID || // Appflow
      env.CI_NAME || // Codeship and others
      env.RUN_ID
    ) // TaskCluster, dsari
  );

export default {
  isServer,
  isClient,
  isDev,
  isProd,
  isDebug,
  stage,
  version,
  isTTY,
  isCI,
};
