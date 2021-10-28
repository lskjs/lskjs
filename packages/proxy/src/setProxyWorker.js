/* eslint-disable camelcase */
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import map from 'lodash/map';
import set from 'lodash/set';
import sumBy from 'lodash/sumBy';

const floor = (a) => (a > 0 && Math.floor(a) <= 0 ? 1 : Math.floor(a));

export function setProxyWorker(proxies, workers) {
  const proxiesCount = proxies.length;
  const workersValue = sumBy(workers, 'value');
  const workersCounts = map(workers, ({ value, ...props }) => ({
    ...props,
    value,
    count: floor((value / workersValue) * proxiesCount),
  }));
  // const leftWorkersCount = workersValue - sumBy(workersCounts, 'count');

  // workersCounts[Object.keys(workersCounts)[0]] += leftWorkersCount;
  // console.log({workersCounts})
  forEach(workersCounts, ({ count, name, target }) => {
    const res = proxies.filter((proxy) => !get(proxy, 'tags.worker') && (get(proxy, 'targets') || []).includes(target));
    // console.log('res', res, { target}, proxies)
    const res2 = res.slice(0, count);
    // console.log('res2', res2)
    res2.forEach((proxy) => set(proxy, 'tags.worker', name));
  });
  // console.log('proxies', proxies)
  return proxies;
}

export default setProxyWorker;
