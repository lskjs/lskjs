import UniversalRouter from 'universal-router';
import Module2 from '@lskjs/module/2';
import Bluebird from 'bluebird';

export class Router extends Module2 {
  // debug = true;
  async init() {
    await super.init();
    if (!this.routes) {
      this.log.warn('!routes');
      return;
    }
    this.log.trace('Router.routes', Object.keys(this.routes));
    this.router = new UniversalRouter(this.routes);
    this.bot.client.use(::this.middleware);
  }

  async middleware(ctx, next) {
    // console.log('ctx.session.nextRoute', ctx.session.nextRoute);
    // console.log('ctx.session.nextRoute', ctx.session.defaultRoute);
    const props = this.getPathFromEvent(ctx);
    // console.log('routerPath', { routerPath });
    const res = await this.resolve({ ctx, ...props });
    console.log('middleware res', props, res);
    // await this.redirect(ctx, routerPath);
    return next(ctx);
  }

  getPathFromEvent(ctx) {
    if (this.bot.isMessageCallback(ctx)) {
      return { path: this.bot.getMessageCallbackData(ctx) };
    }
    if (this.bot.isMessageCommand(ctx)) {
      return { path: this.bot.getMessageText(ctx) };
    }
    if (ctx.session.nextRoute) {
      const { nextRoute } = ctx.session;
      ctx.session.nextRoute = null;
      if (typeof nextRoute === 'string') return { path: nextRoute };
      return nextRoute;
    }
    if (this.bot.isMessageStartsWithEmoji(ctx)) {
      const emojies = this.bot.getMessageStartsEmojiArray(ctx);
      if (!emojies.length) return null;
      return { path: `/${emojies.join('/')}` };
    }
    return ctx.session.defaultRoute || null;
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
    if (!pathname && path) pathname = path;
    // const { routerPath: pathname } = ctx.session;
    if (!pathname) {
      if (this.debug) this.log.warn('!pathname');
      return null;
    }
    if (!ctx) {
      if (this.debug) this.log.warn('!ctx');
      return null;
    }
    if (this.debug) this.log.trace('resolve', pathname);
    ctx.nextRedirect = async (path, query = {}) => {
      if (!path) throw '!path';
      let props = {};
      if (typeof path === 'string') {
        props = { path };
      } else {
        props = path;
      }
      props.query = query;
      ctx.session.nextRoute = props;
      if (__DEV__) {
        this.log.info(`nextRedirect => ${props.path || props.pathname} [delay] ${1000}`);
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
    const data = {
      ...this.provide(),
      pathname,
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

export default Router;
