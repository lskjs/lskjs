export default () => {
  if (typeof window === 'undefined') {
    console.error('running collectWindowReq on server'); // eslint-disable-line no-console
    return null;
  }
  const { location } = window;
  const req = {
    href: location.href,
    protocol: location.protocol.substr(location.protocol.length - 1),
    hostname: location.hostname,
    port: +(location.port || 80),
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
  };
  return req;
};
