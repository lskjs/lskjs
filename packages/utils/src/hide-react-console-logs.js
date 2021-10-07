/* eslint-disable no-undef */
/* eslint-disable no-console */
import Logger from '@lskjs/log';
import debounce from 'lodash/debounce';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import some from 'lodash/some';

export default ({ enable = 1, collapse = 1 } = {}) => {
  if (!enable) return;
  const logger = new Logger({ name: 'React' });

  const triggers = [
    (s) => s.startsWith('Warning: '),
    (s) => s.startsWith('The pseudo class '),
    // (s) => s.indexOf('<svg> attribute') !== -1,
    // console.log(s, s.indexOf('<svg> attribute'), s.indexOf('<svg>'));
  ];

  const isTrigger = (str) => typeof str === 'string' && some(triggers, (t) => t(str));

  console.___error = console.error;
  console.___warn = console.warn;

  let stack = [];
  const addToStack = (...args) => {
    stack.push(args);
    debounce(() => {
      const groups = groupBy(stack, (s) => s[0]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = mapValues(groups, ([_, ...g]) => g);
      if (Object.keys(res).length) {
        logger.warn(res);
        stack = [];
      }
    }, 1000)();
  };

  console.error = (...args) => {
    if (!collapse) return null;
    if (isTrigger(args[0])) return addToStack('error', ...args);
    console.___error(...args);
    return null;
  };
  console.warn = (...args) => {
    if (!collapse) return null;
    if (isTrigger(args[0])) return addToStack('warn', ...args);
    console.___warn(...args);
    return null;
  };
};
