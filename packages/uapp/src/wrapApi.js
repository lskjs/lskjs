/* eslint-disable no-param-reassign */

export default ({ api, app } = {}) => {
  if (!api || !app) return api;
  api.remoteFetch = api.fetch;
  api.fetch = function (...args) {
    const { authToken } = api;
    const [url, options = {}] = args;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return api.remoteFetch(...args);
    }
    // TODO: сделать как-нибудь по нормальному и проверенно
    args[0] = `http://localhost:${app.app.httpInstance.address().port}${args[0]}`;
    return api.remoteFetch(...args);
    const { body = {}, method = 'GET', qs = {} } = options;
    const props = {
      url,
      method,
      body: method === 'POST' ? body : qs,
      headers: authToken
        ? {
            authorization: `Bearer ${authToken}`,
          }
        : {},
      token: authToken,
    };
    if (__STAGE__ === 'isuvorov') console.log('wrapApi.fetch', url, args, '=>', props); // eslint-disable-line no-console
    return app.resolve(props);
  };
  return api;
};
