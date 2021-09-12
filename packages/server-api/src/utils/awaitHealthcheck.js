import env from '@lskjs/env';
import Bluebird from 'bluebird';
import isFunction from 'lodash/isFunction';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';

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

  data = await Bluebird.props(promises);

  return {
    __pack: true,
    __status: status,
    ok: true,
    date: new Date(),
    env,
    debug: pick(process.env, ['CI_PIPELINE_ID', 'CI_JOB_ID']),
    data,
  };
};
