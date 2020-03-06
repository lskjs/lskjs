import qs from 'qs';

export default () => {
  if (typeof window === 'undefined') {
    console.error('running collectWindowReq on server'); // eslint-disable-line no-console
    return null;
  }
  const { location } = window;

  return {
    href: location.href,
    protocol: location.protocol.substr(location.protocol.length - 1),
    hostname: location.hostname,
    port: +(location.port || 80),
    pathname: location.pathname,
    path: window.location.pathname, // Only for universal router
    search: location.search,
    query: qs.parse(window.location.search.substr(1)),
    hash: location.hash,
  };
};
