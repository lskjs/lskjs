import Promise from 'bluebird';
import isFunction from 'lodash/isFunction';
import mapValues from 'lodash/mapValues';
// import some from 'lodash/some';

export default async (healthchecks) => {
  let data = {};
  // eslint-disable-next-line no-param-reassign
  healthchecks = await healthchecks;
  // eslint-disable-next-line no-param-reassign
  if (!healthchecks) healthchecks = { healthcheck: healthchecks };
  let status = 200;
  const promises = mapValues(healthchecks, async (fn, key) => {
    if (!isFunction(fn)) return fn;
    const start = Date.now();
    try {
      const res = await fn();
      // if (!res) return null;
      return { res, timeout: Date.now() - start };
    } catch (err) {
      status = 500;
      console.error(`healthchecks[${key}] err`, err);  //eslint-disable-line
      return { res: null, err, timeout: Date.now() - start };
    }
  });

  data = await Promise.props(promises);

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
