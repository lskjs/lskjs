import ReactApp from 'lego-starter-kit/ReactApp'; // eslint-disable-line
import passport from 'passport';
import _ from 'lodash';

import getApi from './api/v1';
import getDocs from './api/v1/v1.docs';
import routes from './routes';
import assets from './assets'; // eslint-disable-line
import getModules from './modules';
export default class App extends ReactApp {

  getModels() {
    return {
      ...super.getModels(),
      ...require('./models').default(this),
    };
  }

  init() {
    super.init();
    this.passport = passport;
    const strategies = require('./strategies').default(this) || {};
    if (this.config.auth && this.config.auth.socials) {
      this.strategies = {};
      _.map(strategies, (Strategy, name) => {
        if (!this.config.auth.socials[name]) return null;
        return new Strategy();
      }).filter(s => s).map((strategy) => {
        this.strategies[strategy.providerName] = strategy;
      });
    }
  }

  getModules() {
    const models = {
      ...super.getModules(),
      ...getModules(this),
    };
    return models;
  }

  getStatics() {
    const statics = super.getStatics();
    if (__DEV__) {
      statics['/storage'] = `${__dirname}/../storage`;
    }
    return statics;
  }

  run() {
    super.run();
    if (this.strategies) {
      _.forEach(this.strategies || [], (strategy) => {
        this.passport.use(strategy.getStrategy(strategy));
      });
    }
  }


  useRoutes() {
    this.app.enable('trust proxy');
    this.app.all('/api', (req, res) => res.json({ message: 'Current API version is here: /api/v1', url: '/api/v1' }));
    this.app.use('/api/v1', this.getDocsRouter(getDocs, {
      v: 1,
      path: '/api/v1',
    }));
    this.app.use('/api/v1', getApi(this));
  }

  getAssets() {
    return assets.main;
  }

  static Html = require('./Html').default; // eslint-disable-line
  Provider = require('./stores/AppStore').default; // eslint-disable-line

  getUniversalRoutes() {
    return routes;
  }

}
