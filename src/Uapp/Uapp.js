import merge from 'lodash/merge';
import UniversalRouter from 'universal-router';
import Api from 'apiquery';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import autobind from 'core-decorators/lib/autobind';
import Favico from 'favico.js';
import NProgress from 'nprogress';

import SmoothScroll from '../utils/UniversalSmoothScroll';
import Core from '../Core';
// import safeRender from './safeRender';

// import { observable, action } from 'mobx';
// import map from 'lodash/map';
// import React from 'react';
// import moment from 'moment';
// import 'moment/locale/ru';

// import Notification from '~/Uapp/components/Notification';

// import sound from '../utils/sound';
// import MobxUapp from '../MobxUapp';
// import RenderQueue from './RenderQueue';


global.DEV = ({ children, json, pretty = true }) => ( // eslint-disable-line
  __DEV__ ? (
    <div style={{ outline: '1px dotted black' }}>
      {json
        ? (
          <pre>
            {pretty
              ? JSON.stringify(json).replace(/,"/ig, ',\n"')
              : JSON.stringify(json)}
          </pre>
        )
        : children}
    </div>
  ) : null
);

export default class Uapp extends Core {
  name = 'Uapp';
  Api = Api;
  Page = require('./Page').default;
  Root = require('./Root').default;
  theme = require('./theme').default;

  async init(props = {}) {
    await super.init();
    this.config = this.getConfig(this);
    this.initConfig = cloneDeep(this.config); // подумать в init или в run
    // TODO: прокинуть домен (req) когда сервер
    const apiConfig = (this.config && this.config.api || {})
    this.api = new this.Api({
      ...apiConfig,
      url: apiConfig.url ? apiConfig.url : (
        __CLIENT__ ? '/' : ('http://127.0.0.1:' + this.app.config.port)
      )
    });
    if (__SERVER__) {
      this.api.remoteFetch = this.api.fetch;
      const uapp = this;
      this.api.fetch = function (url, options = {}) {
        const { body = {}, method = 'GET', qs = {} } = options;
        if (url.substr(0, 4) === 'http') {
          return this.api.remoteFetch(...arguments);
        }
        return uapp.app.resolve({
          url,
          method,
          body: method === 'POST' ? body : qs,
          headers: {
            authorization: `Bearer ${this.authToken}`,
          },
          token: this.authToken,
        });
      };
    }

    if (__CLIENT__) {
      this.app.historyConfirm = async (message, callback) => {
        const res = await this.confirm({
          title: this.t('form.confirm.title'),
          text: message || this.t('form.confirm.text'),
          cancel: this.t('form.confirm.cancel'),
          submit: this.t('form.confirm.submit'),
        })
        return callback(res);
      };
      this.favico = new Favico({
        animation: 'none',
      });
      this.scroll = new SmoothScroll('a[href*="asdjhashdkjasdkja"]', {
        speed: 500,
        offset: -300,
        easing: 'easeInOutCubic',
      });
    }
    this.initI18();
  }

  url(str, params = null) {
    let query = '';
    if (params) {
      query = `?${map(params, (val, key) => `${key}=${val}`).join('&')}`;
    }
    return `${this.config.url || ''}${str}${query}`;
  }


  setLocale = require('./helpers/setLocale').default;
  getLocale = require('./helpers/getLocale').default;
  getI18Params = require('./helpers/getI18Params').default;
  getI18 = require('./helpers/getI18').default;
  initI18 = require('./helpers/initI18').default;

  prepareNotificationData = require('./helpers/prepareNotificationData').default;
  toast = require('./helpers/toast').default.bind(this);
  

  @autobind
  onError(err = {}, err2) {
    this.toast({
      ...this.prepareNotificationData(err, 'error'),
      ...this.prepareNotificationData(err2, 'error'),
    });
  }


  confirm(props) {
    return this.confirmRef?.open(props);
  }

  scrollTo(selector) {
    if (this.scroll) {
      if (!selector) return null;
      const field = document.querySelector(selector);
      if (!field) return null;
      this.scroll.animateScroll(field);
    }
    return null;
  }


  async checkVersion() {
    const data = await this.api.fetch('/api/healthcheck?info=1');
    if (__VERSION && data.__VERSION && __VERSION !== data.__VERSION) {
      window.location.reload(true);
    }
  }

  async run(props = {}) {
    await super.run();
    const context = this.provide();
    this.log.trace('router.context', Object.keys(context))
    this.routes = this.getRoutes();
    this.router = new UniversalRouter(this.routes, {
      context,
    });


    if (__CLIENT__ && !__DEV__) {
      setTimeout(() => this.checkVersion(), 120 * 1000);
    }
  }


  getConfig(props) {
    return props.config;
    // const site = getSiteConfig(props);
    // // console.log({site});
    // return {
    //   ...props.config,
    //   site,
    // };
  }

  getRoutes() {
    return require('./routes').default;
  }

  resetPage() {
    // console.log('resetPage');
    if (!this.page) {
      this.page = new this.Page();
    }
    this.page.init({
      Root: this.Root,
      uapp: this,
    });
    return this.page;
  }

  async updateClientRoot() {
    // this.page
    // document.body.scrollTop = 0; // @TODO: back
    if (typeof document !== 'undefined') {
      document.title = this.page.renderFullTitle();
    }
    this.page.toTop();
    // @TODO: to @natavts favicon, meta tags
  }

  // return page for req
  async resolve(reqParams = {}) {
    await this.beforeResolve();
    // console.log('resolve');
    const req = Api.createReq(reqParams);
    __CLIENT__ && __DEV__ && this.log.trace('Uapp.resolve', req.path, req.query);
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
      console.error('uapp.router.resolve err', err, this.log); //eslint-disable-line
      // this.log.error('resolveErr', err);
    }
    await this.afterResolve();
    if (__CLIENT__) {
      this.updateClientRoot();
    }
  }

  async beforeResolve(...args) {
    if (__CLIENT__) {
      global.NProgress = NProgress;
      NProgress.start();
      NProgress.set(0.4);
    }
  }
  async afterResolve(...args) {
    if (__CLIENT__) {
      NProgress.done();
    }
  }

  restart() {
   
  }

  provide() {
    return {
      uapp: this,
      log: this.log,
      config: this.config,
      page: this.page,
      api: this.api,

      i18: this.i18,
      t: this.t,
      locale: this.locale,
      theme: this.theme,
    };
  }
}
