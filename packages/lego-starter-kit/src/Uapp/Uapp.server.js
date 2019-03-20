import get from 'lodash/get';
import BaseUapp from './Uapp.common';


export default class Uapp extends BaseUapp {
  getApi() {
    const api = super.getApi();
    api.remoteFetch = api.fetch;
    // console.log('this.rootState', this.rootState);
    // console.log('this.rootState.token', this.rootState.token);
    const authToken = get(this, 'rootState.token');
    // if (!authToken) {
    //   console.log('!authToken @@@@@@@@@');
    // }
    const uapp = this;
    api.fetch = function (url, options = {}) {
      const { body = {}, method = 'GET', qs = {} } = options;
      if (url.substr(0, 4) === 'http') {
        return api.remoteFetch(...arguments);
      }
      return uapp.app.resolve({
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
  }
}
