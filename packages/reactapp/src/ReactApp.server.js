import get from 'lodash/get';
import { createMemoryHistory } from 'history';
import Module from '@lskjs/module';
// import BaseUapp from '@lskjs/uapp';
import Promise from 'bluebird';
import autobind from '@lskjs/autobind';
import antimergeDeep from 'antimerge/antimergeDeep';
// import ReactDOM from 'react-dom/server';
import { renderToStaticMarkup, renderToString, renderToNodeStream } from 'react-dom/server';
import { renderStylesToString, renderStylesToNodeStream } from 'emotion-server';
import BaseHtml from './Html';

export default class ReactApp extends Module {
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
    const url = req.originalUrl || req.url;
    const uapp = new Uapp({
      ...params,
      ...this.getAssetsAndChunks(),
      history: createMemoryHistory({
        initialEntries: [url],
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
    console.error(text, err); // eslint-disable-line no-console
    return this.renderTemplate(`<pre>${text}${err.stack}</pre>`);
  }

  async renderToNodeStream({ res, render, component }) {
    const delemitter = `<!-- renderToNodeStream ${Math.random()} renderToNodeStream --->`;
    const content = await render(delemitter);
    const [before, after] = content.split(delemitter);
    res.write(before);
    const stream = renderToNodeStream(component).pipe(renderStylesToNodeStream());
    stream.pipe(res, { end: false });
    stream.on('end', () => {
      res.write(after);
      res.end();
    });
  }


  createHtmlRender(page) {
    const { Html = BaseHtml } = this;
    return (content) => {
      const html = new Html({
        content,
        meta: page.state.meta,
        rootState: page.uapp.rootState,
      });
      return html.render();
    };
  }

  
  @autobind
  async render(req, res) {
    const strategy = 'stream' in req.query ? 'renderToNodeStream' : null;
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
        if (__DEV__) {
          this.log.debug('ReactApp.redirect', page.state.redirect);
          await Promise.delay(2000);
        }
        return res.redirect(page.state.redirect);
      }
      try {
        ({ status } = page.state);
        component = page.render();
      } catch (err) {
        throw { err, stack: ['Error SSR', 'ReactApp.render', 'page.render()'] };
      }
      // console.log('component', component);
      try {
        if (strategy === 'renderToNodeStream') {
          // рендерим потом асинхронно
        } else {
          if (strategy === 'renderToStaticMarkup') {
            content = renderToStaticMarkup(component);
          } else {
            content = renderToString(component);
          }
          content = renderStylesToString(content);
        }
      } catch (err) {
        throw { err, stack: ['Error SSR', 'ReactApp.render', 'ReactDOM.renderToStaticMarkup(component)'] };
      }
      // console.log('content', content);
    } catch ({ err, stack }) {
      status = 500;
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
    if (strategy === 'renderToNodeStream' && !content && component) {
      return this.renderToNodeStream({
        req, res, render, component,
      });
    }
    try {
      content = await render(content);
    } catch (err2) {
      status = 500;
      content = 'ERROR: Html.render()';
      if (this.log && this.log.error) {
        this.log.error(content, err2);
      } else {
        console.error(content, err2);
      }
    }

    return res.status(status || 200).send(content);
  }
}
