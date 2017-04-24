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
