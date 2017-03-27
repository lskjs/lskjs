import ReactApp from 'lego-starter-kit/ReactApp'; // eslint-disable-line
import passport from 'passport';
import _ from 'lodash';

import getApi from './api/v1';
import getDocs from './api/v1/v1.docs';
import routes from './routes';
import assets from './assets'; // eslint-disable-line

export default class App extends ReactApp {

  getModels() {
    const superModels = super.getModels();
    const models = require('./models').default(this);
    return Object.assign(superModels, models);
  }

  init() {
    super.init();
    const strategies = require('./strategies').default(this) || {};
    this.strategies = _.map(strategies, (Strategy) => {
      return new Strategy();
    });
    this.passport = passport;
  }

  getStatics() {
    return {
      ...super.getStatics(),
      ...{
        '/storage': `${__dirname}/../${this.config.upload.path || 'storage'}`,
      },
    };
  }

  run() {
    super.run();
    _.map(this.strategies || [], (strategy) => {
      this.passport.use(strategy.getStrategy(strategy));
    });
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
