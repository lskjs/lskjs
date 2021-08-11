import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

export const proxyFilter = (proxy, filter) => {
  if (isFunction(filter)) return filter(proxy);
  if (filter && filter.provider && get(proxy, 'provider') !== filter.provider) return false;
  if (filter && filter.type && get(proxy, 'type') !== filter.type) return false;
  if (filter && filter.country && get(proxy, 'tags.country') !== filter.country) return false;
  if (filter && filter.ipv && get(proxy, 'tags.ipv') !== filter.ipv) return false;
  if (filter && filter.check) return filter.check(proxy);
  return true;
};

export default proxyFilter;
