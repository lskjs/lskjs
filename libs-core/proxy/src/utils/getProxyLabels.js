import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';
import get from 'lodash/get';

export const getProxyLabels = (proxy) => {
  const labels = {};
  if (proxy) {
    labels.proxyV = 2;
    labels.proxyKey = proxy.key;
    labels.proxyType = proxy.type;
    labels.proxyProvider = proxy.provider;
    forEach(proxy.tags, (value, name) => {
      labels[camelCase(`proxy_${name}`)] = value;
    });
    if (get(proxy, 'manager.strategy.strategy')) labels.proxyStrategy = get(proxy, 'manager.strategy.strategy');
    forEach(get(proxy, 'manager.config.labels', []), (value, name) => {
      labels[camelCase(`proxy_${name}`)] = value;
    });
  }
  return labels;
};

export default getProxyLabels;
