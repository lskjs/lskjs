import get from 'lodash/get';

export const proxyFilter = (proxy, filter) => {
  if (filter.key && get(proxy, 'key') !== filter.key) return false;
  if (filter.provider && get(proxy, 'provider') !== filter.provider) return false;
  if (filter.type && get(proxy, 'type') !== filter.type) return false;
  if (filter.country && get(proxy, 'tags.country') !== filter.country) return false;
  if (filter.ipv && get(proxy, 'tags.ipv') !== filter.ipv) return false;
  if (filter.check) return filter.check(proxy);
  return true;
};

export default proxyFilter;
