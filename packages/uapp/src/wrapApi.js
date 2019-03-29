import get from 'lodash/get';

export default ({ api, app } = {}) => {
  if (!api || !app) return api;
  api.remoteFetch = api.fetch;
  const authToken = get(this, 'rootState.token');
  api.fetch = function (...args) {
    const { url, options = {} } = args;
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
