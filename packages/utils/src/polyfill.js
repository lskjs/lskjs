const globalOrWindow = typeof window !== 'undefined' ? window : global;
globalOrWindow.__SERVER__ = typeof window === 'undefined';
globalOrWindow.__CLIENT__ = !globalOrWindow.__SERVER__;
if (typeof __DEV__ === 'undefined' && !globalOrWindow.__DEV__) {
  globalOrWindow.__DEV__ = false;
}
// globalOrWindow.__WEBVIEW__ = !globalOrWindow.__SERVER__;
if (!globalOrWindow.__STAGE__ && !globalOrWindow.__STAGE__) {
  globalOrWindow.__STAGE__ = 'stage';
}

// if (__SERVER__) {
//   process.on('unhandledRejection', (err) => {
//     console.error('Promise: Unhandled Rejection'); // eslint-disable-line
//     console.error(err.stack); //eslint-disable-line
//     if (typeof err.message === 'string' &&
//  err.message.indexOf('reason: socket hang up') !== -1) {
//       console.error('socket hang up => process.exit'); // eslint-disable-line
//       process.exit(1);
//       // process.kill();
//     }
//     // application specific logging, throwing an error, or other logic here
//   });
// }
if (__DEV__) {
  console.log('Compiling ...'); // eslint-disable-line no-console
}
global.startedAt = Date.now();
global.timing = () => Date.now() - global.startedAt;
// if (!global.Promise) global.Promise = require('bluebird');
// if (!global.fetch) global.fetch = require('isomorphic-fetch');

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
