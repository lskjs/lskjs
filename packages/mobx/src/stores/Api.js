import get from 'lodash/get';

export default class Api {
  constructor(props) {
    Object.assign(this, props);
  }
  fetch(...args) {
    const api = get(this, 'uapp.api', get(this, 'api'));
    if (!api) throw '!api in props';
    if (!api.fetch) throw '!api.fetch in props';
    return api.fetch(...args);
  }
}

