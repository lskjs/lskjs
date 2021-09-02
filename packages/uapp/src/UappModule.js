/* global window */
// eslint-disable-next-line max-classes-per-file
import { isClient } from '@lskjs/env';
import Module from '@lskjs/module';
import UniversalRouter from 'universal-router';

import { collectUniversalRoutes } from './collectUniversalRoutes';
import UappProvider from './UappProvider';

export class UappModule extends Module {
  isClient = isClient;
  Provider = UappProvider;

  getModules() {
    return {
      scrollTo: () => import('./ScrollToModule'),
      progress: () => import('./ProgressModule'),
      page: () => import('./Page'),
      api: () => import('./ApiModule'),
    };
  }

  getRoutes() {
    return {};
  }

  async getModuleProps(name) {
    const props = await super.getModuleProps(name);
    if (name === 'page') {
      return {
        ...props,
        Provider: this.Provider,
        // rootState: this.getRootState(),
      };
    }
    return props;
  }

  async init() {
    await super.init();
    this.api = await this.module('api');
    if (this.isClient) {
      this.on('resolve:start', this.resolveStart.bind(this));
      this.on('resolve:finish', this.resolveFinish.bind(this));
    }
  }

  async run() {
    await super.run();
    this.routes = await this.getRoutes();
    this.log.debug('routes', collectUniversalRoutes(this.routes));
    const context = await this.provide();
    this.log.debug('router.context', Object.keys(context));
    this.router = new UniversalRouter(this.routes, { context });
    this.scrollTo = await this.module('scrollTo');
    this.progress = await this.module('progress');
  }

  async provide() {
    return {
      app: this,
      req: this.req,
      module: this.module.bind(this),
    };
  }

  __providers = {};
  async __provide() {
    if (Object.keys(this.__providers).length) return this.__providers;
    this.__providers = await this.provide();
    return this.__providers;
  }

  async resolveStart() {
    if (this.progress && this.progress.current) {
      this.progress.current.start();
    }
  }
  async resolveFinish({ page }) {
    try {
      const meta = page.getMeta();
      if (meta && meta.title && this.isClient) window.document.title = meta.title;
    } catch (err) {
      this.log.error('cant set title', err);
    }
    if (this.progress && this.progress.current) {
      this.progress.current.finish();
    }
    this.req.path = this.history.location.path;
    this.req.query = this.history.location.query;
  }

  async resolve(reqParams = {}) {
    this.emit('resolve:start', reqParams);
    const req = {
      ...this.req,
      path: reqParams.path,
      query: reqParams.query,
    };
    try {
      if (this.isClient) this.log.debug('resolve', req.path, req.query);
      const page = await this.module('page');
      await page.beforeResolve();
      const providers = await this.__provide();
      const res = await this.router.resolve({
        pathname: reqParams.path,
        path: reqParams.path,
        query: reqParams.query,
        // req,
        page,
        req,
        ...providers,
      });
      await page.afterResolve();
      this.emit('resolve:finish', { req, res, page });
      return { res, page };
    } catch (err) {
      this.log.error('uapp.router.resolve ERR:', err);
      this.emit('resolve:error', { req, err });
      throw err;
    }
  }
}

export default UappModule;
