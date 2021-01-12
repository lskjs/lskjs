import serializeWindow from '@lskjs/utils/serializeWindow';
import flattenKeys from '@lskjs/utils/flattenKeys';
import mapValuesDeep from '@lskjs/utils/mapValuesDeep';
import isPlainObject from 'lodash/isPlainObject';
import pickBy from 'lodash/pickBy';
import awaitHealthchecks from './utils/awaitHealthcheck';
import Api from './Api';

export default class IndexApi extends Api {
  async healthcheck(req) {
    if (!this.app) return awaitHealthchecks({ healthcheck: null });
    if (this.app.healthcheck) return awaitHealthchecks({ healthcheck: await this.app.healthcheck(req) });
    if (this.app.healthchecks) return awaitHealthchecks(this.app.healthchecks(req));
    return awaitHealthchecks({ healthcheck: null });
  }
  __getRoutesList(tree = false) {
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
      res.routes = this.__getRoutesList(true);
    }
    return res;
  }
  env(req) {
    return this.app.getEnv(req);
  }
  envjs(req, res) {
    return res.send(serializeWindow(this.app.getEnv(req)));
  }
  async getRoutes() {
    return {
      ...(await super.getRoutes()),
      '/': ::this.index,
      '/env': ::this.env,
      '/env.json': ::this.env,
      '/env.js': ::this.envjs,
      '/healthcheck': ::this.healthcheck,
    };
  }
}
