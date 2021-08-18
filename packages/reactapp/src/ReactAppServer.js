import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import Module from '@lskjs/module';
import { start } from '@lskjs/module/utils/safe';
import antimergeDeep from '@lskjs/utils/antimergeDeep';
import autobind from '@lskjs/utils/autobind';
import collectExpressReq from '@lskjs/utils/collectExpressReq';
import Bluebird from 'bluebird';
import { renderStylesToNodeStream, renderStylesToString } from 'emotion-server';
import { createMemoryHistory } from 'history';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import pick from 'lodash/pick';
// import ReactDOM from 'react-dom/server';
import { renderToNodeStream, renderToStaticMarkup, renderToString } from 'react-dom/server';

import BaseHtml from './Html';

// config: this.config,
// app: this,
// expressResolve: this.expressResolve,
// express: this.express,

export class ReactAppServer extends Module {
  async init() {
    await super.init();
    if (!this.expressResolve && this.app) this.expressResolve = this.app.expressResolve;
    if (!this.express && this.app) this.express = this.app.express;
    if (!this.Uapp && !this.hasModule('uapp')) throw new Err('!Uapp');
  }

  async getModuleConfig(name) {
    const config = await super.getModuleConfig(name);
    if (name === 'uapp') {
      return {
        ...this.config.client,
        ...config,
      };
    }
    return config;
  }

  getRootState({ req, ...props }) {
    let config = null;
    if (this.initClientConfig) {
      config = antimergeDeep(this.config.client, this.initClientConfig);
    }
    return {
      req: pick(req, ['reqId', 'user', 'userId', 'token']),
      config,
      ...props,
    };
  }

  async getUapp({ req, ...params } = {}) {
    const uappReq = collectExpressReq(req);
    const config = await this.getModuleConfig('uapp'); // cloneDeep(get(this, 'config.client', {}));
    if (this.hasModule('uapp')) {
      return this.module('uapp');
    }
    const uapp = await start(this.Uapp, {
      ...params,
      history: createMemoryHistory({
        // TODO: вырезать
        initialEntries: [req.originalUrl], // TODO: may be path ?
      }),
      req: uappReq,
      rootState: this.getRootState({ req }),
      config: cloneDeep(config),
      app: this,
      __parent: this,
    });
    return uapp;
  }

  async uappResolve({ req } = {}) {
    if (this.debug) this.log.trace('ReactAppServer.resolve req=', !!req); // eslint-disable-line no-console
    const uapp = await this.getUapp({ req });
    if (!uapp) throw new Err('!uapp');
    const path = req.originalUrl.split('?').shift();
    const page = await uapp.resolve({
      path,
      query: req.query,
    });
    // const page = uapp.page
    return page;
  }

  async renderToNodeStream({ res, render, component, styleStrategy }) {
    const delemitter = `<!-- renderToNodeStream ${Math.random()} renderToNodeStream --->`;
    const content = await render(delemitter);
    const [before, after] = content.split(delemitter);
    res.write(before);
    let stream = renderToNodeStream(component);
    if (styleStrategy === 'emotion') {
      stream = stream.pipe(renderStylesToNodeStream());
    }
    stream.pipe(res, { end: false });
    stream.on('end', () => {
      res.write(after);
      res.end();
    });
  }

  getPublicPath() {
    return get(this, 'config.server.public', `${process.cwd() + (isDev ? '' : '/..')}/public`);
  }

  getAssetManifest() {
    const assetManifestPath = `${this.getPublicPath()}/asset-manifest.json`;
    try {
      const str = require('fs').readFileSync(assetManifestPath);
      const json = JSON.parse(str);
      return json;
    } catch (err) {
      this.app.log.error(`Html getAssetManifest can't open: ${assetManifestPath}`, err);
      return {};
    }
  }

  createHtmlRender(page) {
    const { Html = BaseHtml, htmlProps = {} } = this;
    return (content) => {
      const html = new Html({
        content,
        publicPath: this.getPublicPath(),
        assetManifest: this.getAssetManifest(),
        meta: page && page.getMeta ? page.getMeta() : '',
        rootState: page && page.getRootState ? page.getRootState() : '',
        ...htmlProps,
      });
      return html.render();
    };
  }

  @autobind
  async render(req, res) {
    // ?__ssr=json
    // ?__ssr=nodeStream
    // ?__ssr=staticMarkup
    // ?__ssr=nodeStream,emotion
    // ?__ssr=staticMarkup,emotion
    // ?__ssr=string,emotion
    const ssr = get(req, 'query.__ssr') || get(this, 'config.reactApp.ssr') || null;
    let strategy;
    let styleStrategy;
    if (typeof ssr === 'string') {
      [strategy, styleStrategy] = ssr.split(',');
    }

    if (this.debug) this.log.trace('ReactAppServer.render', { strategy }, this.name); // eslint-disable-line no-console
    // const strategy = 'stream' in req.query ? 'renderToNodeStream' : null;
    let status = 200;
    let page;
    let component;
    let content;
    try {
      try {
        // const res = this.uappResolve({ req }));
        ({ page } = await this.uappResolve({ req }));
        if (!page) {
          this.log.warn('ReactAppServer.uappResolve(): !page');
        } else if (!page._page) {
          this.log.debug('ReactAppServer.uappResolve(): !page._page');
        }
      } catch (err) {
        throw { err, stack: ['Error SSR', `${this.name}.render`, `${this.name}.uappResolve({req})`] };
      }
      if (get(page, 'state.redirect')) {
        // eslint-disable-next-line no-shadow
        const { redirect: redirectArgs, status = 300 } = get(page, 'state', {});
        const [redirect] = redirectArgs;
        if (isDev) {
          this.log.debug('ReactAppServer.redirect', redirect);
          await Bluebird.delay(2000);
        }
        if (strategy === 'json') {
          return { status, redirect };
        }
        return res.redirect(redirect);
      }
      try {
        ({ status = 200 } = get(page, 'state', {}));
        if (get(page, 'render')) {
          component = page.render();
        } else if (typeof page === 'string') {
          component = page;
        } else {
          if (!page) throw new Err('!page');
          if (isDev && page && !page.render) {
            console.error('!page.render', { page, render: page.render }); // eslint-disable-line no-console
            throw new Err('!page.render');
          }
          throw new Err('!page');
        }
      } catch (err) {
        throw { err, stack: ['Error SSR', 'ReactAppServer.render', 'page.render()'] };
      }

      // this.log.trace('component', component);
      let strategyMethod;
      try {
        if (strategy === 'nodeStream') {
          // рендерим потом асинхронно
        } else if (strategy === 'staticMarkup') {
          strategyMethod = 'renderToStaticMarkup';
          content = renderToStaticMarkup(component);
        } else {
          strategyMethod = 'renderToString';
          content = renderToString(component);
        }
        if (content && styleStrategy === 'emotion') {
          content = renderStylesToString(content);
        }
      } catch (err) {
        if (isDev) console.error(`ReactDOM.${strategyMethod}(component)`, component); // eslint-disable-line no-console
        throw {
          err,
          stack: [
            'Error SSR',
            'ReactAppServer.render',
            strategyMethod ? `ReactDOM.${strategyMethod}(component)` : null,
          ].filter(Boolean),
        };
      }
      // this.log.trace('content', content);
    } catch ({ err, stack }) {
      status = 505;
      if (isDev) {
        const text = [...stack, ''].join(':\n');
        if (this.log && this.log.error) {
          this.log.error(text, err);
        } else {
          console.error(text, err); // eslint-disable-line no-console
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
        styleStrategy,
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
        console.error(content, err2); // eslint-disable-line no-console
      }
    }

    if (strategy === 'json') {
      return { status, content };
    }

    return res.status(status).send(content);
  }
}

export default ReactAppServer;
