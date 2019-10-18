import Promise from 'bluebird';
import isFunction from 'lodash/isFunction';
import mapValues from 'lodash/mapValues';
import some from 'lodash/some';

export default async (incomeData) => {
  let data = {};
  const promises = mapValues(incomeData, async (fn, key) => {
    if (!isFunction(fn)) return fn;
    const start = Date.now();
    try {
      const result = await fn();
      if (!result) return null;
      return Date.now() - start;
    } catch (err) {
      console.error(`healthcheck(${key}) err`, err);  //eslint-disable-line
      return null;
    }
  });

  data = await Promise.props(promises);

  const status = some(data, a => a == null) ? 500 : 200;

  const json = {
    CONTAINER_IMAGE: process.env.CONTAINER_IMAGE || global.CONTAINER_IMAGE,
    __VERSION: process.env.__VERSION || global.__VERSION,
    __STAGE: process.env.__STAGE || global.__STAGE,
    __INSTANCE: process.env.__INSTANCE || global.__INSTANCE,
    __MASTER: process.env.__MASTER || global.__MASTER,
    __SERVER__: process.env.__SERVER__ || global.__SERVER__,
    __PROD__: process.env.__PROD__ || global.__PROD__,
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
  };

  return {
    __pack: true,
    __status: status,
    ok: true,
    date: new Date(),
    ...mapValues(json, Boolean),
    data,
  };
};
