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
global.Promise = require('bluebird');
global.fetch = require('isomorphic-fetch');
// require('event-source-polyfill');
// global.fetch = require('./fetch').default;

if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
}

Date.prototype.toHumanString = function toHumanString() {
  return [
    this.toISOString().substr(0, 10).split('-').reverse().join('.'),
    this.toISOString().substr(11, 8),
  ].join(' ');
};
Date.toHumanString = function toHumanString(date) {
  if (!date) return date;
  return new Date(date).toHumanString();
};


export default function ready() {
  if (__DEV__) {
    console.log(`🔥  Compiled [${global.timing()}ms]`);
  }
}
