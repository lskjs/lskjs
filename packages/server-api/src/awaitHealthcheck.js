import Promise from 'bluebird';
import isFunction from 'lodash/isFunction';
import mapValues from 'lodash/mapValues';
import some from 'lodash/some';

export default async (healthchecks) => {
  let data = {};
  const promises = mapValues(healthchecks, async (fn, key) => {
    if (!isFunction(fn)) return fn;
    const start = Date.now();
    try {
      const result = await fn();
      if (!result) return null;
      return Date.now() - start;
    } catch (err) {
      console.error(`healthchecks[${key}] err`, err);  //eslint-disable-line
      return null;
    }
  });

  data = await Promise.props(promises);

  const status = some(data, (a) => a == null) ? 500 : 200;

  return {
    __pack: true,
    __status: status,
    ok: true,
    date: new Date(),
    env: {
      __IMAGE__: global.__IMAGE__,
      __VERSION__: global.__VERSION__,
      __INSTANCE__: global.__INSTANCE__,
      __STAGE__: global.__STAGE__,
      __PROD__: global.__PROD__,
      __DEV__: global.__DEV__,
      __SERVER__: global.__SERVER__,
      __CLIENT__: global.__CLIENT__,
    },
    data,
  };
};
