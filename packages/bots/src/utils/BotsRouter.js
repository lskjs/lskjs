import UniversalRouter from 'universal-router';
import Module from '@lskjs/module';
import Bluebird from 'bluebird';
import url from 'url';
import qs from 'querystring';

export class BotsRouter extends Module {
  // debug = true;
  async init() {
    await super.init();
    if (!this.routes) {
      this.log.warn('!routes');
      return;
    }
    if (!this.bot.client) {
      this.log.warn('!client');
      return;
    }
    if (!this.bot.client.use) {
      this.log.warn('!client.use');
      return;
    }
    this.log.trace('routes', this.routes.map((c) => c.path).filter(Boolean));
    this.router = new UniversalRouter(this.routes);
    this.bot.client.use(this.middleware.bind(this));
  }

  async middleware(ctx, next) {
    // console.log('ctx.session.nextRoute', ctx.session.nextRoute);
    // console.log('ctx.session.nextRoute', ctx.session.defaultRoute);
    const props = this.getPathFromEvent(ctx);
    // console.log('routerPath', { routerPath });
    const res = await this.resolve({ ctx, ...props });
    // console.log('middleware res', props, res);
    // await this.redirect(ctx, routerPath);
    return next(ctx);
  }

  parsePathnameAndQuery(str) {
    const { pathname, query: queryString } = url.parse(str);
    const query = queryString && queryString.length ? qs.decode(queryString) : undefined;

    return {
      pathname,
      query,
    };
  }

  getPathFromEvent(ctx) {
    const { session = {} } = ctx;
    if (this.bot.isMessageCallback(ctx)) {
      delete session.nextRoute;
      return this.parsePathnameAndQuery(this.bot.getMessageCallbackData(ctx));
    }
    if (this.bot.isMessageCommand(ctx)) {
      delete session.nextRoute;
      return this.parsePathnameAndQuery(this.bot.getMessageCommand(ctx));
    }
    if (session.nextRoute) {
      const { nextRoute } = session;
      delete session.nextRoute;
      if (typeof nextRoute === 'string') return this.parsePathnameAndQuery(nextRoute);
      return nextRoute;
    }
    if (this.bot.isMessageStartsWithEmoji(ctx)) {
      const emojies = this.bot.getMessageStartsEmojiArray(ctx);
      if (!emojies.length) return null;
      return { path: `/${emojies.join('/')}` };
    }
    return session.defaultRoute || null;
  }

  // redirect(ctx, routerPath) {
  //   ctx.session.routerPath = routerPath;
  //   return this.resolve(ctx);
  // }

  provide() {
    return {
      router: this,
      app: this.app,
      botsModule: this.app.botsModule,
      bot: this.bot,
      i18: this.app.i18,
      module: this.app.module,
      log: this.log,
    };
  }

  async resolve({ pathname, path, query = {}, ctx } = {}) {
    // eslint-disable-next-line no-param-reassign
    if (!path && pathname) path = pathname;
    // const { routerPath: pathname } = ctx.session;
    if (!path) {
      if (this.debug) this.log.warn('!path');
      return null;
    }
    if (!ctx) {
      if (this.debug) this.log.warn('!ctx');
      return null;
    }
    if (this.debug) this.log.trace('resolve', path);
    ctx.nextRedirect = async (path, query) => {
      if (!path) throw '!path';
      let props = {};
      if (typeof path === 'string') {
        props = { path };
      } else {
        props = path;
      }
      if (!props.query && query) props.query = query;
      ctx.session.nextRoute = props;
      if (__DEV__) {
        this.log.info(`nextRedirect =>  ${JSON.stringify(props)}`);
        // await Bluebird.delay(1000);
      }
      return props;
    };
    ctx.redirect = async (path, query) => {
      if (!path) throw '!path';
      let props = {};
      if (typeof path === 'string') {
        props = { path };
      } else {
        props = path;
      }
      if (!props.query && query) props.query = query;
      if (__DEV__) {
        this.log.info(`redirect => ${props.path || props.pathname} ${JSON.stringify(props.query)} [delay] ${1000}`);
        await Bluebird.delay(1000);
      }
      return this.resolve({ ctx, ...props });
    };
    const provide = this.provide();
    const data = {
      ...provide,
      req: {
        path,
        pathname: path,
        bot: provide.bot,
        log: this.log,
        ctx,
        query,
        i18: provide.i18,
      },
      path,
      pathname: path,
      query,
      ctx,
    };
    if (this.debug) this.log.trace('context', Object.keys(data));
    return this.router.resolve(data).catch((err) => {
      this.log.error('err', err);
      throw err;
    });
  }
}

export default BotsRouter;
