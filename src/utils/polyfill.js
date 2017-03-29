if (__DEV__) {
  console.log('Compiling ...');
}
global.startedAt = Date.now();
global.timing = () => {
  return Date.now() - global.startedAt;
};
// }
require('babel-polyfill');
require('babel-runtime/core-js/promise').default = require('bluebird');
// require('event-source-polyfill');
// require('isomorphic-fetch');
global.fetch = require('./fetch').default;

if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
}

export default function ready() {
  if (__DEV__) {
    console.log(`🔥  Compiled [${global.timing()}ms]`);
  }
}
