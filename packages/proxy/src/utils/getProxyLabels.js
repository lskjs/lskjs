import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';

export const getProxyLabels = (proxy) => {
  const labels = {};
  if (proxy) {
    labels.proxyKey = proxy.key;
    labels.proxyType = proxy.type;
    labels.proxyProvider = proxy.provider;
    forEach(proxy.tags, (value, name) => {
      labels[camelCase(`proxy_${name}`)] = value;
    });
  }
  return labels;
};

export default getProxyLabels;
