/* eslint-disable no-undef */
/* eslint-disable no-console */
import some from 'lodash/some';

console.___error = console.error;

const triggers = ['Warning: ', 'The pseudo class ', 'Error: <svg>'];

const isTrigger = (str) => typeof str === 'string' && some(triggers, (t) => str.startsWith(t));

console.error = (...args) => {
  if (isTrigger(args[0])) {
    console.log('[e] React:', [args]);
    return;
  }
  console.___error(...args);
};
console.___warn = console.warn;
console.warn = (...args) => {
  if (isTrigger(args[0])) {
    console.log('[w] React:', [args]);
    return;
  }
  console.___warn(...args);
};
