

import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';
import serializeWindow from '@lskjs/utils/serializeWindow';
import Api from './Api';


const mapValuesDeep = (v, callback) => (
  isPlainObject(v)
    ? mapValues(v, c => mapValuesDeep(c, callback))
    : callback(v)
);

export default class IndexApi extends Api {
  getRoutes() {
    const api = this.path || '/api';
    return {
      '/': () => ({
        message: `Current API version is here: ${api}`,
        url: api,
        routes: __DEV__ ? mapValuesDeep(this.routes, a => true) : undefined,
      }),
      '/env': req => this.app.getEnv(req),
      '/env.js': (req, res) => res.send(serializeWindow(this.app.getEnv(req))),
      '/config': () => (__DEV__ ? this.app.config : {}),
      '/healthcheck': this.healthcheck,
    };
  }
}
