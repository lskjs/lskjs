import CoreApp from 'lego-starter-kit/CoreApp'; // eslint-disable-line
import getApi from './api/v1';
import getDocs from './api/v1/v1.docs';
import assets from './assets'; // eslint-disable-line

export default class App extends CoreApp {


  getI18Params(params = {}) {
    const config = this.config.i18 || {};
    return {
      resources: {
        en: {
          translation: require('../locales/en.json'),
        },
        ru: {
          translation: require('../locales/ru.json'),
        },
      },
      fallbackLng: __STAGE__ !== 'master' ? 'en' : 'ru',
      ...config,
      ...params,
    };
  }

  async getI18(...args) {
    return new Promise((resolve, reject) => {
      const newInstance = i18next.createInstance();
      newInstance.init(this.getI18Params(...args), (err) => {
        if (err) return reject(err);
        return resolve(newInstance);
      });
    });
  }

  // async run() {
  //   await super.run();
  //   this.i18 = await this.getI18();
  //   this.t = (...args) => {
  //     return this.i18.t(...args);
  //   };
  // }


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
      ...require('~/modules/server').default(this),
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
