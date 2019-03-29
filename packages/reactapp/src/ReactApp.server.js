import get from 'lodash/get';
import { createMemoryHistory } from 'history';
import Module from '@lskjs/module';
// import BaseUapp from '@lskjs/uapp';
import antimergeDeep from 'antimerge/antimergeDeep';
import ReactDOM from 'react-dom/server';
import Html from './Html';

console.log(8789789798);

export default class ReactApp extends Module {
  // BaseUapp = BaseUapp;
  name = 'App';

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

  async getUapp({ req, ...params }) {
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

  renderError(err, stack = []) {
    if (!__DEV__) return err.message;
    const text = [...stack, ''].join(':\n');
    console.error(text, err);
    return this.renderTemplate(`<pre>${text}${err.stack}</pre>`);
  }

  async render(req, res) {
    
    let page;
    let status = 200;
    let content;
    try {
      try {
        page = await this.getPage({ req });
      } catch (err) {
        throw { err, stack: ['Error SSR', 'ReactApp.render', 'ReactApp.getPage(req)'] };
      }
      if (get(page, 'state.redirect')) {
        if (__DEV__) {
          this.log.debug('ReactApp.redirect', page.state.redirect);
          await Promise.delay(2000);
        }
        return res.redirect(page.state.redirect);
      }
      let component;
      try {
        ({ status } = page.state);
        component = page.render();
      } catch (err) {
        throw { err, stack: ['Error SSR', 'ReactApp.render', 'page.render()'] };
      }
      console.log('component', component)
      try {
        content = ReactDOM.renderToStaticMarkup(component); // because async style render
      } catch (err) {
        return { err, stack: ['Error SSR', 'ReactApp.render', 'ReactDOM.renderToStaticMarkup(component)'] };
      }
      console.log('content', content)

    } catch ({ err, stack }) {
      status = 500;
      if (__DEV__) {
        const text = [...stack, ''].join(':\n');
        this.log.error(text, err);
        content = `<pre>${text}${err.stack}</pre>`;
      } else {
        content = err.message;
      }
    }
    try {
      const html = new Html({
        content,
        meta: page.state.meta,
        rootState: page.uapp.rootState,
      });
      content = await html.render();
    } catch (err2) {
      status = 500;
      content = 'ERROR: Html.render()';
      this.log.error(content, err2);
    }

    return res.status(status || 200).send(content);
  }
}
