/* global window */
import { isClient, isDev, isProd, isServer, stage } from '@lskjs/env';

const globalOrWindow = typeof window !== 'undefined' ? window : global;

globalOrWindow.__SERVER__ = isServer;
globalOrWindow.__CLIENT__ = isClient;
globalOrWindow.__DEV__ = isDev;
globalOrWindow.__PROD__ = isProd;
globalOrWindow.__STAGE__ = stage;

export default globalOrWindow;
