export default initReq => {
  const formattedUrl = require('url').format({
    protocol: initReq.protocol,
    host: initReq.get('host'),
    pathname: initReq.originalUrl,
  });

  return {
    href: formattedUrl.href,
    protocol: formattedUrl.protocol,
    hostname: formattedUrl.hostname,
    port: formattedUrl.port,
    pathname: formattedUrl.pathname,
    path: formattedUrl.pathname, // Only for universal router
    search: formattedUrl.search,
    query: initReq.query,
    hash: formattedUrl.hash,

    ip: formattedUrl.ip,
    xhr: formattedUrl.xhr,
    cookies: formattedUrl.cookies,
  };
};

// pick(initReq, ['hostname', 'originalUrl', 'path', 'query', 'ip', 'cookies', 'protocol', 'xhr']);
