/* global window */

export const isServer = typeof window === 'undefined';
export const isClient = !isServer;
export const isDev = (isServer ? process.env.NODE_ENV !== 'production' : window.__DEV__) || false;
export const isProd = !isDev;
export const stage =
  (isServer ? process.env.STAGE || process.env.__STAGE || (isDev ? process.env.user : null) : window.__STAGE__) ||
  'development';

export default {
  isServer,
  isClient,
  isDev,
  isProd,
  stage,
};
