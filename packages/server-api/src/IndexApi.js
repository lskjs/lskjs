import serializeWindow from '@lskjs/utils/serializeWindow';
import flattenKeys from '@lskjs/utils/flattenKeys';
import mapValuesDeep from '@lskjs/utils/mapValuesDeep';
import isPlainObject from 'lodash/isPlainObject';
import pickBy from 'lodash/pickBy';
import awaitHealthchecks from './awaitHealthcheck';
import Api from './Api';

export default class IndexApi extends Api {
  path = '/api';
  healthcheck(req) {
    if (!this.app) return null;
    if (this.app.healthcheck) return this.app.healthcheck(req);
    if (this.app.healthchecks) return awaitHealthchecks(this.app.healthchecks(req));
    return null;
  }
  getRoutesList(tree = false) {
    if (tree) {
      return mapValuesDeep(
        this.getRoutes(),
        (a) => a,
        (res2) => (isPlainObject(res2) ? pickBy(res2, Boolean) : res2),
      );
    }
    return flattenKeys(this.getRoutes(), [], (a) => a.join(''));
  }
  index() {
    const url = this.path;
    const res = {
      message: `Current API version is here: ${url}`,
      url,
    };
    if (__DEV__) {
      res.routes = this.getRoutesList(true);
    }
    return res;
  }
  config() {
    if (!__DEV__) return {};
    return this.app.config;
  }
  env(req) {
    return this.app.getEnv(req);
  }
  envjs(req, res) {
    return res.send(serializeWindow(this.app.getEnv(req)));
  }
  getRoutes() {
    return {
      '/': ::this.index,
      '/env': ::this.env,
      '/env.json': ::this.env,
      '/env.js': ::this.envjs,
      '/config': ::this.config,
      '/healthcheck': ::this.healthcheck,
    };
  }
}
