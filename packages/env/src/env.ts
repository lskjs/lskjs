/* global window */
declare global {
  interface Window {
    __DEV__: boolean;
    __STAGE__: boolean;
  }
}

export const isServer = typeof window === 'undefined';
export const isClient = !isServer;
export const isDev = (isServer ? process.env.NODE_ENV !== 'production' : Boolean(window.__DEV__)) || false;
export const isProd = !isDev;
export const isDebug = isDev;
export const stage =
  (isServer
    ? process.env.STAGE || process.env.__STAGE || (isDev ? process.env.user : null)
    : Boolean(window.__STAGE__)) || 'development';

export default {
  isServer,
  isClient,
  isDev,
  isProd,
  isDebug,
  stage,
};
