import get from 'lodash/get';
import { createMemoryHistory } from 'history';
import Module from '@lskjs/module';
import BaseUapp from '@lskjs/uapp';
import antimergeDeep from 'antimerge/antimergeDeep';
import cloneDeep from 'lodash/cloneDeep';

export default class ReactApp extends Module {
  BaseUapp = BaseUapp;
  name = 'App';

  async init() {
    await super.init();
    const initConfigClient = get(this, 'config._withoutEnvJson.client');
    this.initConfigClient = cloneDeep(initConfigClient);
  }

  getRootState({ req } = {}) {
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
    }
    return rootState;
  }

  getAssetsAndChunks() {
    return {
      assets: {},
      chunks: {},
    };
  }

  Uapp = BaseUapp
  async getUapp({ req , ...params}) {
    const { Uapp } = this;
    const uapp = new Uapp({
      ...params,
      ...this.getAssetsAndChunks(),
      history: createMemoryHistory({
        initialEntries: [req.url],
      }),
      req,
      rootState: this.getRootState({ req }),
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

  async getPage({ req }) {
    const uapp = await this.getUapp({ req });
    await uapp.resolve({
      path: req.path,
      query: req.query,
    });
    return uapp.page;
  }

  async middleware(req, res, next) {
    let page;
    try {
      page = await this.getPage({ req });
    } catch (err) {
      this.log.error('SSR app.getPage(req) err', err);
      return next(err);
    }
    if (get(page, 'state.redirect')) {
      this.log.debug('Page.redirect', page.state.redirect);
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
  }
}
