import merge from 'lodash/merge';
import UniversalRouter from 'universal-router';
import Core from '../Core';
import Page from './Page';
import Api from 'apiquery';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
// import safeRender from './safeRender';

// TODO: вынести функции работы с хостнеймом куда нибудь
function isRightHostname(hostnames = [], hostname) {
  for (const name of hostnames) {
    // @TODO: check wildcards
    // console.log('===', name, hostname, name === '*');
    if (name === '*') return true;
    if (name === hostname) return true;
  }
  return false;
}

function findConfigByHostname(configs, hostname) {
  for (const config of configs) {
    if (config.hostnames && isRightHostname(config.hostnames, hostname)) {
      return config;
    }
    // console.log('isRightHostname(config.hosts, hostname)', isRightHostname(config.hosts, hostname));
    if (config.hosts && isRightHostname(config.hosts, hostname)) {
      // console.log('RETURN', config);
      return config;
    }
  }
  return {};
}

function getSiteConfig(props) {
  const config = props.config || {};
  const hostname = props.req.hostname;
  let siteConfig = config.site || {};
  // console.log({hostname, siteConfig});
  if (config.sites && Array.isArray(config.sites)) {
    const findedConfig = findConfigByHostname(config.sites, hostname);
    // console.log({findedConfig});
    if (findedConfig) {
      siteConfig = merge({}, siteConfig, findedConfig);
    }
  }
  // console.log({siteConfig});
  return siteConfig;
}

// TODO: вынести функции куда нибудь
function resolveCtxRoutes(routes, ctx) {
  function resolveCtxRoute(initRoutes) {
    let routes = initRoutes; // eslint-disable-line
    if (typeof routes === 'function') {
      try {
        routes = routes(ctx) || {};
      } catch (err) {
        console.log('resolveCtxRoute err', err, routes);
        routes = {};
      }
    }
    if (routes.children) {
      routes.children = routes.children.map(resolveCtxRoute);
    }
    return routes;
  }
  const resultRoutes = resolveCtxRoute(routes);
  return resultRoutes;
}


export default class Uapp extends Core {
  name = 'Uapp';
  Page = Page;
  Api = Api;

  async init(props = {}) {
    // this.log.trace('Uapp.init')
    await super.init();
    this.config = this.getConfig(this);
    this.initConfig = cloneDeep(this.config); // подумать в init или в run
    // TODO: прокинуть домен (req) когда сервер
    const apiConfig = (this.config && this.config.api || {})
    this.api = new this.Api({
      ...apiConfig,
      url: apiConfig.url ? apiConfig.url : (
        __CLIENT__ ? '/' : ('http://127.0.0.1:' + this.app.config.port)
        // TODO: this.app.httpServer
      )
    });
    // this.log = this.getLogger();
  }

  async run(props = {}) {
    await super.run();
    const context = this.provide();
    this.log.trace('router.context', Object.keys(context))
    const routes = this.getRoutes();
    this.routes = resolveCtxRoutes(routes, this);
    __DEV__ && console.log('Uapp.routes', this.routes);
    this.router = new UniversalRouter(this.routes, {
      context,
    });
  }


  getConfig(props) {
    const site = getSiteConfig(props);
    // console.log({site});
    return {
      ...props.config,
      site,
    };
  }

  getRoutes() {
    return require('./router').default(this)
  }

  resetPage() {
    // console.log('resetPage');
    if (!this.page) {
      this.page = new this.Page();
    }
    this.page.init({
      uapp: this,
    });
    return this.page;
  }

  async updateClientRoot() {
    // this.page
    document.body.scrollTop = 0; // @TODO: back
    document.title = this.page.renderFullTitle();
    // @TODO: to @natavts favicon, meta tags
  }

  // return page for req
  async resolve(reqParams = {}) {
    // console.log('resolve');
    const req = Api.createReq(reqParams);
    __CLIENT__ && this.log.trace('Uapp.resolve', req.path, req.query);
    // this.log.trace('resolve1', req.path, req.query);
    // this.log.trace({r:'resolve2'});
    // this.log.trace('resolve3', 'some');
    // __DEV__ && console.log('Uapp.resolve', req);
    this.resetPage();
    // console.log('page $$$$', this.page);
    // console.log('this.router.resolve');
    try {
      // console.log('Uapp.router.resolve', );
      await this.router.resolve({
        pathname: reqParams.path,
        path: reqParams.path,
        query: reqParams.query,
        req,
        page: this.page,
      });
    } catch(err) {
      console.log('app.router.resolve err', err, this.log);
      // this.log.error('resolveErr', err);
    }
    // if (__CLIENT__) {
    //   this.updateClientRoot();
    // }
  }

  provide() {
    return {
      uapp: this,
      log: this.log,
      config: this.config,
      page: this.page,
      api: this.api,
    };
  }
}
