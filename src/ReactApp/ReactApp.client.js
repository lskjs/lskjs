import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import UniversalRouter from 'universal-router';
import qs from 'query-string';
import { createPath } from 'history/PathUtils';
import mixin from 'lego-starter-kit/utils/mixin';
import history from './core/history';
import { ErrorReporter, deepForceUpdate } from './core/devUtils';
import { autobind } from 'core-decorators';
import routes from './routes';
import Html from './Html';
import Provider from './Provider';
import _ from 'lodash';
const bunyan = require('browser-bunyan');

const LOGGING = false;


export default class ReactApp {
  static mixin = mixin;
  constructor(params = {}) {
    Object.assign(this, params);
    this.log = this.getLogger();
  }


  getLogger(params) {
    const options = Object.assign({
      name: 'client',
      src: __DEV__,
      level: 'trace',
    }, this.config && this.config.log || {});
    return bunyan.createLogger(options, params);
  }

  static Html = Html;

  restoreScrollPosition(state) {
    LOGGING && console.log('restoreScrollPosition');
    if (state && state.scrollY !== undefined) {
      window.scrollTo(state.scrollX, state.scrollY);
    } else {
      window.scrollTo(0, 0);
    }
  }

  renderCount = 0
  postRender() {
    LOGGING && console.log('postRender', this.renderCount);
    if (this.renderCount === 0) {
      const elem = document.getElementById('css');
      if (elem) elem.parentNode.removeChild(elem);
      return;
    }
    // document.title = 'route.title';
    let scrollX = 0;
    let scrollY = 0;
    const pos = this.scrollPositionsHistory[location.key];
    if (pos) {
      scrollX = pos.scrollX;
      scrollY = pos.scrollY;
    } else {
      const targetHash = location.hash.substr(1);
      if (targetHash) {
        const target = document.getElementById(targetHash);
        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top;
        }
      }
    }
    window.scrollTo(scrollX, scrollY);
    if (window.ga) {
      window.ga('send', 'pageview', createPath(location));
    }
  }

  getUniversalRoutes() {
    return routes;
  }


  // appComponent({ component, ...props }) {
  //   LOGGING && console.log('ReactApp appComponent');
  //   return <AppWrapper {...props} children={component} />
  // }

  scrollPositionsHistory = {}
  currentLocation = null
  @autobind
  async onLocationChange(location) {
    const Root = this.constructor.Html.Root;
    LOGGING && console.log('onLocationChange', location);
    this.scrollPositionsHistory[this.currentLocation.key] = {
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
    };
    if (history.action === 'PUSH') {
      delete this.scrollPositionsHistory[location.key];
    }
    this.currentLocation = location;


    try {
      const props = await this.getHtmlProps({});

      // console.log('??', this.currentLocation.key , location.key);
      if (this.currentLocation.key !== location.key) {
        return;
      }

      if (props.redirect) {
        history.replace(props.redirect);
        return;
      }
      if (__CLIENT__ && window.__CSR__) return false;
      this.appInstance = ReactDOM.render(
        <Root {...props} />,
        this.container,
        () => {
          this.postRender();
          this.renderCount += 1;
        },
      );
    } catch (error) {
      console.error('error!!@', error); // eslint-disable-line no-console

      // Current url has been changed during navigation process, do nothing
      if (this.currentLocation.key !== location.key) {
        return;
      }

      // Display the error in full-screen for development mode
      if (__DEV__) {
        this.appInstance = null;
        document.title = `Error: ${error.message}`;
        ReactDOM.render(<ErrorReporter error={error} />, this.container);
        return;
      }

      // Avoid broken navigation in production mode by a full page reload on error
      window.location.reload();
    }
  }

  getRootState() {
    return window.__ROOT_STATE__ || {};
  }

  @autobind
  init() {
    this.rootState = this.getRootState();
    // console.log('this.config 11', this.config);
    this.config = _.merge({}, this.config || {}, this.rootState && this.rootState.config || {});
    this.rootState.config = null;
    FastClick.attach(document.body);
    this.container = document.getElementById('root');
    if (window.history && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    this.currentLocation = history.location;
    history.listen(this.onLocationChange.bind(this));
    this.onLocationChange(this.currentLocation);
    this.hmrInit();
    return Promise.resolve();
  }

  run() {
    return this.init();
    // Run the application when both DOM is ready and page content is loaded
    // if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
    //   this.init();
    // } else {
    //   document.addEventListener('DOMContentLoaded', this.init, false);
    // }
  }

  hmrUpdate() {
    if (this.appInstance) {
      try {
        deepForceUpdate(this.appInstance);
      } catch (error) {
        this.appInstance = null;
        document.title = `Hot Update Error: ${error.message}`;
        ReactDOM.render(<ErrorReporter error={error} />, this.container);
        return;
      }
    }
    this.onLocationChange(this.currentLocation);
  }
  hmrInit() {
    // if (module.hot) {
    // module.hot.accept('./routes', () => {
    //   // const routes = this.getUniversalRoutes();
    //   if (this.appInstance) {
    //     try {
    //       deepForceUpdate(this.appInstance);
    //     } catch (error) {
    //       this.appInstance = null;
    //       document.title = `Hot Update Error: ${error.message}`;
    //       ReactDOM.render(<ErrorReporter error={error} />, this.container);
    //       return;
    //     }
    //   }
    //   this.onLocationChange(this.currentLocation);
    // });
  }

  getReq() {
    return {
      // ...this.req,
      hostname: window.location.hostname,
      path: window.location.pathname,
      query: qs.parse(window.location.search),
    };
  }


  // / Synonims
  getReqRootState(req) {
    return this.rootState;
  }

  Provider = Provider
  createProvider(rootState, req) {
    const params = {
      rootState,
      req,
      config: this.config,
      app: this,
    };
    if (this.Provider.v === 2) {
      return new this.Provider(params);
    }
    return new this.Provider(params.rootState, params.req, params.config);
  }

  provider = null
  getReqCtx(req) {
    const rootState = this.getReqRootState(req);

    if (this.provider == null) {
      this.provider = this.createProvider(rootState, req);
    }
    const ctx = {
      config: this.config,
      rootState,
      req,
      provider: this.provider,
      history,
      style: [],
      insertCss: (...styles) => {
        const removeCss = styles.map(x => x._insertCss());
        return () => { removeCss.forEach(f => f()); };
      },
    };
    return ctx;
  }
  getReqProps(req) {
    const reqCtx = this.getReqCtx(req);
    return {
      path: location.pathname,
      query: qs.parse(location.search),
      app: this,
      ctx: reqCtx,
      appStore: reqCtx && reqCtx.provider,
      status: 200,
      ...require('./getReqPropsMigrationV2').default(this, { reqCtx, req }),
    };
  }

  async getHtmlProps(req) {
    const reqProps = await this.getReqProps(req);
    let route = await UniversalRouter.resolve(this.getUniversalRoutes(), reqProps);
    if (route._page) {
      route = route.getState();
    }
    return {
      ...reqProps,
      ...route,
      route,
      children: route.component,
    };
  }

  async start() {
    await this.run();
    console.log(`🎃  The server is running at http://127.0.0.1/ [${global.timing()}ms]`);
  }
}
