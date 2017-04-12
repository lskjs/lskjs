import ReactApp from 'lego-starter-kit/ReactApp'; // eslint-disable-line
import passport from 'passport';
import _ from 'lodash';
import getModules from '~/modules/index.server'; // eslint-disable-line

import getApi from './api/v1';
import getDocs from './api/v1/v1.docs';
import assets from './assets'; // eslint-disable-line

export default class App extends ReactApp {

  getAssets() {
    return assets.main;
  }

  getModels() {
    return {
      ...super.getModels(),
      ...require('./models').default(this),
    };
  }

  async init() {
    await super.init();
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

  async run() {
    await super.run();
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


}
