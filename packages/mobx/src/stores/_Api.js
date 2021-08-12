import get from 'lodash/get';

export default class Api {
  constructor(props) {
    Object.assign(this, props);
  }
  fetch(...args) {
    const api = get(this, 'app.api', get(this, 'uapp.api', get(this, 'api')));
    if (!api) throw new Err('!api in props');
    if (!api.fetch) throw new Err('!api.fetch in props');
    return api.fetch(...args);
  }
}
