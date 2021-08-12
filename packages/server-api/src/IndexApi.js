import env, { isDev, stage } from '@lskjs/env';
import flattenKeys from '@lskjs/utils/flattenKeys';
import mapValuesDeep from '@lskjs/utils/mapValuesDeep';
import serializeWindow from '@lskjs/utils/serializeWindow';
import isPlainObject from 'lodash/isPlainObject';
import pickBy from 'lodash/pickBy';

import Api from './Api';
import awaitHealthchecks from './utils/awaitHealthcheck';

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
    if (isDev) {
      res.routes = this.__getRoutesList(true);
    }
    return res;
  }
  env(req) {
    return {
      __ROOT_STATE__: {
        token: req.token,
        user: req.user,
        req: {
          token: req.token,
          user: req.user,
        },
        config: this.app.config.client || {},
      },
      ...env,
      __DEV__: isDev,
      __STAGE__: stage,
    };
  }
  envjs(req, res) {
    return res.send(serializeWindow(this.env(req)));
  }
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/': this.index.bind(this),
      '/env': this.env.bind(this),
      '/env.json': this.env.bind(this),
      '/env.js': this.envjs.bind(this),
      '/healthcheck': this.healthcheck.bind(this),
    };
  }
}
