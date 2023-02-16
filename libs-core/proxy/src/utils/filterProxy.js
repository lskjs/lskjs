import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

const includes = (list, target) => (list || []).includes(target);

export const checkProxy = (proxy, filter) => {
  if (isFunction(filter)) return filter(proxy);
  if (filter.key && get(proxy, 'key') !== filter.key) return false;
  if (filter.type && get(proxy, 'type') !== filter.type) return false;
  if (filter.provider && get(proxy, 'provider') !== filter.provider) return false;
  if (filter.target && !includes(get(proxy, 'targets'), filter.target)) return false;
  if (filter.test && !includes(get(proxy, 'tests'), filter.test)) return false;
  if (filter.worker && get(proxy, 'tags.worker') !== filter.worker) return false;
  if (filter.country && get(proxy, 'tags.country') !== filter.country) return false;
  if (filter.subtype && get(proxy, 'tags.subtype') !== filter.subtype) return false;
  if (filter.ipv && !get(proxy, 'tags.ipv', '').startsWith(filter.ipv)) return false;
  if (filter.check) return filter.check(proxy);
  return true;
};

export const filterProxy = (proxies = [], filter) => proxies.filter((proxy) => checkProxy(proxy, filter));

export default filterProxy;
