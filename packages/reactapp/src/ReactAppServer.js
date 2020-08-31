import get from 'lodash/get';
import pick from 'lodash/pick';
import { createMemoryHistory } from 'history';
import Module from '@lskjs/module';
import cloneDeep from 'lodash/cloneDeep';
import Promise from 'bluebird';
import autobind from '@lskjs/utils/autobind';
import collectExpressReq from '@lskjs/utils/collectExpressReq';
import antimergeDeep from '@lskjs/utils/antimergeDeep';
// import ReactDOM from 'react-dom/server';
import { renderToStaticMarkup, renderToString, renderToNodeStream } from 'react-dom/server';
import { renderStylesToString, renderStylesToNodeStream } from 'emotion-server';
import BaseHtml from './Html';

const DEBUG = false;

export default class ReactAppServer extends Module {
  name = 'ReactAppServer';

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
    const { Uapp } = this;
    const uappReq = collectExpressReq(req);
    const config = cloneDeep(get(this, 'config.client', {}));
    const uapp = new Uapp({
      ...params,
      history: createMemoryHistory({
        // TODO: вырезать
        initialEntries: [req.originalUrl],
      }),
      req: uappReq,
      rootState: this.getRootState({ req }),
      config,
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

  async uappResolve({ req } = {}) {
    if (DEBUG) console.log('ReactAppServer.resolve req=', !!req); // eslint-disable-line no-console
    const uapp = await this.getUapp({ req });
    if (!uapp) throw '!uapp';
    const page = await uapp.resolve({
      path: req.originalUrl,
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

  getAssetManifest() {
    const publicPath = get(this, 'config.server.public', `${process.cwd() + (__DEV__ ? '' : '/..')}/public`);
    const assetManifestPath = `${publicPath}/asset-manifest.json`;
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
    // ?__ssr=staticMarkup
    // ?__ssr=nodeStream,emotion
    // ?__ssr=staticMarkup,emotion
    // ?__ssr=renderToStaticMarkup,emotion
    const ssr = get(req, 'query.__ssr') || get(this, 'config.reactApp.ssr') || null;

    let strategy;
    let styleStrategy;
    if (typeof ssr === 'string') {
      [strategy, styleStrategy] = ssr.slice(',');
    }

    if (DEBUG) console.log('ReactAppServer.render', { strategy }, this.name); // eslint-disable-line no-console
    // const strategy = 'stream' in req.query ? 'renderToNodeStream' : null;
    let status = 200;
    let page;
    let component;
    let content;
    try {
      try {
        page = await this.uappResolve({ req });
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
        if (__DEV__) {
          this.log.debug('ReactAppServer.redirect', redirect);
          await Promise.delay(2000);
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
          if (__DEV__ && !get(page, 'render')) {
            console.error('!page', { page }); // eslint-disable-line no-console
          }
          throw '!page';
        }
      } catch (err) {
        throw { err, stack: ['Error SSR', 'ReactAppServer.render', 'page.render()'] };
      }

      // console.log('component', component);
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
        if (__DEV__) console.error(`ReactDOM.${strategyMethod}(component)`, component); // eslint-disable-line no-console
        throw {
          err,
          stack: [
            'Error SSR',
            'ReactAppServer.render',
            strategyMethod ? `ReactDOM.${strategyMethod}(component)` : null,
          ].filter(Boolean),
        };
      }
      // console.log('content', content);
    } catch ({ err, stack }) {
      status = 505;
      if (__DEV__) {
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
