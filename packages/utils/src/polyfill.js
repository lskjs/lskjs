/* eslint-disable no-undef */
/* eslint-disable no-console */
import global from './global';

// if (__DEV__) {
//   console.log(`Compiling ... [__STAGE__=${__STAGE__} __DEV__=${__DEV__}]`);
// }
global.startedAt = Date.now();
global.timing = () => Date.now() - global.startedAt;

if (typeof process !== 'undefined') {
  process.on('uncaughtException', (err) => {
    console.error("===> process.on('uncaughtException') <===");
    console.error(err);
    console.error("^^^^ process.on('uncaughtException') ^^^^");
  });
}

if (!global._babelPolyfill) require('@babel/polyfill');

export default function ready(cb) {
  if (__DEV__) {
    console.log(`🔥  Compiled [${global.timing()}ms] [__STAGE__=${__STAGE__} __DEV__=${__DEV__}]`);
  }
  if (typeof cb === 'function') cb();
}
