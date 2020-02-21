import get from 'lodash/get';
import { createMemoryHistory } from 'history';
import Module from '@lskjs/module';
// import BaseUapp from '@lskjs/uapp';
import Promise from 'bluebird';
import autobind from '@lskjs/autobind';
import antimergeDeep from '@lskjs/utils/antimergeDeep';
// import ReactDOM from 'react-dom/server';
import { renderToStaticMarkup, renderToString, renderToNodeStream } from 'react-dom/server';
// import { renderStylesToString, renderStylesToNodeStream } from 'emotion-server';
import BaseHtml from './Html';

export default class ReactApp extends Module {
  name = 'App'; 

  constructor(params = {}) {
    super(params);
    Object.assign(this, params);
  }

  getRootState({ req } = {}) {
    return { __EMPTY__: true };
    const rootState = {
      reqId: req.reqId,
      token: req.token,
      user: req.user,
      ...(this.rootState || {}),
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

  async getUapp({ req, ...params } = {}) {
    const { Uapp } = this;
    const url = req.originalUrl || req.url || req.path;
    const uapp = new Uapp({
      ...params,
      ...this.getAssetsAndChunks(),
      history: createMemoryHistory({
        initialEntries: [url],
      }),
      req,
      rootState: this.getRootState({ req }),
      config: get(this, 'config.client', {}),
      app: this,
    });
    try {
      if (uapp.start) {
        await uapp.start();
      }
    } catch (err) {
      this.log.error('uapp.start()', err);
      throw err;
    }
    return uapp;
  }

  async getPage({ req } = {}) {
    const uapp = await this.getUapp({ req });
    await uapp.resolve({
      path: req.originalUrl || req.url || req.path,
      query: req.query,
    });
    return uapp.page;
  }

  async renderToNodeStream({ res, render, component }) {
    const delemitter = `<!-- renderToNodeStream ${Math.random()} renderToNodeStream --->`;
    const content = await render(delemitter);
    const [before, after] = content.split(delemitter);
    res.write(before);
    const stream = renderToNodeStream(component); //.pipe(renderStylesToNodeStream());
    stream.pipe(res, { end: false });
    stream.on('end', () => {
      res.write(after);
      res.end();
    });
  }

  createHtmlRender(page) {
    const { Html = BaseHtml } = this;
    return content => {
      const html = new Html({
        content,
        meta: get(page, 'state.meta', {}),
        rootState: get(page, 'uapp.rootState,', {}),
      });
      return html.render();
    };
  }

  @autobind
  async render(req, res) {
    const strategy = get(req, 'query.__strategy') || get(this, 'config.reactApp.strategy') || null;
    // const strategy = 'stream' in req.query ? 'renderToNodeStream' : null;
    let status = 200;
    let page;
    let component;
    let content;
    try {
      try {
        page = await this.getPage({ req });
      } catch (err) {
        throw { err, stack: ['Error SSR', 'ReactApp.render', 'ReactApp.getPage(req)'] };
      }
      if (get(page, 'state.redirect')) {
        // eslint-disable-next-line no-shadow
        const { redirect: redirectArgs, status = 300 } = get(page, 'state', {});
        const [redirect] = redirectArgs;
        if (__DEV__) {
          this.log.debug('ReactApp.redirect', redirect);
          await Promise.delay(2000);
        }
        if (strategy === 'json') {
          return { status, redirect };
        }
        return res.redirect(redirect);
      }
      try {
        ({ status = 200 } = get(page, 'state', {}));
        component = page.render();
      } catch (err) {
        throw { err, stack: ['Error SSR', 'ReactApp.render', 'page.render()'] };
      }

      // console.log('component', component);
      try {
        if (strategy === 'nodeStream') {
          // рендерим потом асинхронно
        } else {
          if (strategy === 'staticMarkup') {
            content = renderToStaticMarkup(component);
          } else {
            content = renderToString(component);
          }
          // content = renderStylesToString(content);
        }
      } catch (err) {
        throw { err, stack: ['Error SSR', 'ReactApp.render', 'ReactDOM.renderToStaticMarkup(component)'] };
      }
      // console.log('content', content);
    } catch ({ err, stack }) {
      status = 505;
      if (__DEV__) {
        const text = [...stack, ''].join(':\n');
        if (this.log && this.log.error) {
          this.log.error(text, err);
        } else {
          console.error(text, err);
        }
        content = `<pre>${text}${err ? JSON.stringify(err.stack) : ''}</pre>`;
      } else {
        content = err.message;
      }
    }
    const render = this.createHtmlRender(page);
    if (strategy === 'nodeStream' && !content && component) {
      return this.renderToNodeStream({
        req,
        res,
        render,
        component,
      });
    }
    try {
      content = await render(content);
    } catch (err2) {
      status = 505;
      content = 'ERROR: Html.render()';
      if (this.log && this.log.error) {
        this.log.error(content, err2);
      } else {
        console.error(content, err2);
      }
    }

    if (strategy === 'json') {
      return { status, content };
    }

    return res.status(status).send(content);
  }
}
