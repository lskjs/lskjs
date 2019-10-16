import get from 'lodash/get';

export default ({ api, app } = {}) => {
  if (!api || !app) return api;
  api.remoteFetch = api.fetch;
  api.fetch = function (...args) {
    const { authToken } = api;
    const [url, options = {}] = args;
    // console.log('api.fetch', url, args);
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return api.remoteFetch(...args);
    }
    const { body = {}, method = 'GET', qs = {} } = options;
    return app.resolve({
      url,
      method,
      body: method === 'POST' ? body : qs,
      headers: authToken ? {
        authorization: `Bearer ${authToken}`,
      } : {},
      token: authToken,
    });
  };
  return api;
};
