import global from './global';

if (__DEV__) {
  console.log(`Compiling ... [__STAGE__=${__STAGE__} __DEV__=${__DEV__}]`); // eslint-disable-line no-console
}
global.startedAt = Date.now();
global.timing = () => Date.now() - global.startedAt;
// if (!global.Promise) global.Promise = require('bluebird');
// if (!global.fetch) global.fetch = require('isomorphic-fetch');

if (typeof process !== 'undefined') {
  process.on('uncaughtException', (err) => {
    console.error("===> process.on('uncaughtException') <==="); // eslint-disable-line no-console
    console.error(err); // eslint-disable-line no-console
    console.error("^^^^ process.on('uncaughtException') ^^^^"); // eslint-disable-line no-console
  });
}

if (!global._babelPolyfill) {
  require('@babel/polyfill');
}
// // require('@babel/polyfill');
// // require('event-source-polyfill');
// // global.fetch = require('./fetch').default;

// if (typeof window !== 'undefined') {
//   window.matchMedia = window.matchMedia || function () {
//     return {
//       matches: false,
//       addListener() {},
//       removeListener() {},
//     };
//   };
// }

export default function ready(cb) {
  if (__DEV__) {
    console.log(`🔥  Compiled [${global.timing()}ms]`); // eslint-disable-line no-console
  }
  if (typeof cb === 'function') cb();
}
