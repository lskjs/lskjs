/* global window */
declare global {
  interface Window {
    env: any;
    __DEV__: boolean;
    __STAGE__: boolean;
  }
}
// const safeWindow = typeof window === 'undefined' ? window :

export const isServer = typeof window === 'undefined';
export const isClient = !isServer;
export const isDev = (isServer ? process.env.NODE_ENV !== 'production' : Boolean(window.__DEV__)) || false;
export const isProd = !isDev;
export const isDebug = isDev;

export const stage =
  (isServer
    ? process.env.STAGE || process.env.__STAGE || process.env.__STAGE__ || (isDev ? process.env.user : null)
    : (window.env && window.env.stage) || window.__STAGE__) || 'development';

export const version = isServer
  ? process.env.VERSION || process.env.__VERSION || process.env.__VERSION__
  : (window.env && window.env.version) || '000000';

export const instance = isServer
  ? process.env.INSTANCE || process.env.__INSTANCE || process.env.__INSTANCE__
  : (window.env && window.env.instance) || '1';

export const isMasterInstance = instance === '1';

export default {
  isServer,
  isClient,
  isDev,
  isProd,
  isDebug,
  stage,
  version,
  instance,
  isMasterInstance,
};
