import url from 'url';

export default req => {
  const formattedUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const parsedUrl = url.parse(formattedUrl);

  return {
    href: parsedUrl.href,
    protocol: parsedUrl.protocol ? parsedUrl.protocol.substr(0, parsedUrl.protocol.length - 1) : null,
    hostname: parsedUrl.hostname,
    port: parsedUrl.port ? +parsedUrl.port : null,
    pathname: parsedUrl.pathname,
    path: parsedUrl.pathname, // Only for universal router
    search: parsedUrl.search,
    query: req.query,
    hash: parsedUrl.hash,

    ip: req.ip,
    xhr: req.xhr,
    cookies: req.cookies,
  };
};

// pick(req, ['hostname', 'originalUrl', 'path', 'query', 'ip', 'cookies', 'protocol', 'xhr']);
