import get from 'lodash/get';
import { createMemoryHistory } from 'history';
import CoreApp from '../CoreApp';
import Uapp from '../Uapp';
import antimergeDeep from 'antimerge/antimergeDeep';
import cloneDeep from 'lodash/cloneDeep';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
// import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
// console.log({assets, chunks});

export default class ReactApp extends CoreApp {
  name = 'App';

  async init() {
    await super.init();
    // const initConfigClient = get(this, 'config._withoutEnvJson.client', get(this, 'config.client', {}));
    const initConfigClient = get(this, 'config._withoutEnvJson.client');
    this.initConfigClient = cloneDeep(initConfigClient);
  }
  // async run() {
  //   await super.run();
  //   // this.initConfigClient = cloneDeep(this.config.client); // подумать в init или в run
  // }

  getRootState(req) {
    const rootState = {
      reqId: req.reqId,
      token: req.token,
      user: req.user,
    };
    if (this.config.remoteConfig) {
      const realConfig = this.config.client || {};
      if (__DEV__) {
        rootState.config = realConfig;
      } else {
        rootState.config = antimergeDeep(realConfig, this.initConfigClient);
      }
      // console.log('realConfig', realConfig);
      // console.log('this.initConfigClient', this.initConfigClient);
      // console.log('rootState.config', rootState.config);
    }
    return rootState;
  }

  getAssetsAndChunks() {
    return {
      assets: {},
      chunks: {},
    };
  }

  BaseUapp = Uapp
  async getUapp(req) {
    const Uapp2 = this.Uapp || this.BaseUapp;
    const uapp = new Uapp2({
      ...this.getAssetsAndChunks(),
      history: createMemoryHistory({
        initialEntries: [req.url],
      }),
      req,
      rootState: this.getRootState(req),
      config: this.config.client,
      app: this,
    });
    try {
      await uapp.start();
    } catch (err) {
      this.log.error('uapp.start()', err);
      throw err;
    }
    return uapp;
  }

  async getPage(req) {
    const uapp = await this.getUapp(req);
    await uapp.resolve({
      path: req.path,
      query: req.query,
    });
    return uapp.page;
  }

  useDefaultRoute() {
    this.app.get('*', async (req, res, next) => {
      let page;
      try {
        page = await this.getPage(req);
        // __DEV__ && console.log({page});
      } catch (err) {
        this.log.error('SSR app.getPage(req) err', err);
        return next(err);
      }
      // console.log('page', page);
      if (get(page, 'state.redirect')) {
        __DEV__ && console.log('Page.redirect', page.state.redirect);
        return res.redirect(page.state.redirect);
      }

      let content;
      try {
        content = page.renderHtml();
      } catch (err) {
        this.log.error('SSR page.renderHtml() err', err);
        return next(err);
      }

      res
        .status(page.state.status || 200)
        .send(content || '');
    });
  }
}
