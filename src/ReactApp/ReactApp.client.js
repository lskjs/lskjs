import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import UniversalRouter from 'universal-router';
import queryString from 'query-string';
import { createPath } from 'history/PathUtils';
import history from './core/history';
import { ErrorReporter, deepForceUpdate } from './core/devUtils';
import { autobind } from 'core-decorators'
import routes from './routes'
import AppWrapper from './AppWrapper'


const LOGGING = false


export default class ReactApp {
  constructor(params = {}) {
    Object.assign(this, params)
  }

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
    return routes
  }

  appComponent({ component, context }) {
    LOGGING && console.log('ReactApp appComponent');
    return <AppWrapper context={context} children={component} />
  }

  scrollPositionsHistory = {}
  currentLocation = null
  @autobind
  async onLocationChange(location) {
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
      const route = await UniversalRouter.resolve(this.getUniversalRoutes(), {
        path: location.pathname,
        query: queryString.parse(location.search),
      });
      if (this.currentLocation.key !== location.key) {
        return;
      }

      if (route.redirect) {
        history.replace(route.redirect);
        return;
      }

      const context = {
        history,
        insertCss: (...styles) => {
          const removeCss = styles.map(x => x._insertCss());
          return () => { removeCss.forEach(f => f()); };
        },
      };
      const component = this.appComponent({...route, context})
      LOGGING && console.log('component', component, route);
      // this.render(con)
      this.appInstance = ReactDOM.render(
        component,
        this.container,
        () => {
          this.postRender(this.container, location, component);
          this.renderCount += 1;
        }
      );

    } catch (error) {
      console.error('error!!@', error); // eslint-disable-line no-console

      // Current url has been changed during navigation process, do nothing
      if (this.currentLocation.key !== location.key) {
        return;
      }

      // Display the error in full-screen for development mode
      if (process.env.NODE_ENV !== 'production') {
        this.appInstance = null;
        document.title = `Error: ${error.message}`;
        ReactDOM.render(<ErrorReporter error={error} />, container);
        return;
      }

      // Avoid broken navigation in production mode by a full page reload on error
      window.location.reload();
    }
  }

  @autobind
  init() {
    LOGGING && console.log('init');
    FastClick.attach(document.body);
    this.container = document.getElementById('app');
    if (window.history && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    this.currentLocation = history.location;
    history.listen(this.onLocationChange.bind(this));
    this.onLocationChange(this.currentLocation);
    return Promise.resolve()
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

  hmrInit() {
    if (module.hot) {
      module.hot.accept('./routes', () => {
        // const routes = this.getUniversalRoutes();
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
      });
    }
  }
}
