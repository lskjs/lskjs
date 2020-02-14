import serializeWindow from '@lskjs/utils/serializeWindow';
import flattenKeys from '@lskjs/utils/flattenKeys';
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
  index() {
    let routes;
    if (__DEV__) {
      routes = flattenKeys(this.routes, [], a => a.join('/'));
    }
    const url = this.path;
    return {
      message: `Current API version is here: ${url}`,
      url,
      routes,
    };
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
