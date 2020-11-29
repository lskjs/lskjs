import UniversalRouter from 'universal-router';
import Module2 from '@lskjs/module/2';

export class Router extends Module2 {
  // debug = true;
  async init() {
    await super.init();
    if (!this.routes) {
      this.log.warn('!routes')
      return;
    }
    this.log.trace('routes', Object.keys(this.routes));
    this.router = new UniversalRouter(this.routes);
    this.bot.client.use(::this.middleware);
  }

  async middleware(ctx, next) {
    const routerPath = this.getPathFromEvent(ctx);
    await this.redirect(ctx, routerPath);
    return next(ctx);
  }

  getPathFromEvent(ctx) {
    if (this.bot.isMessageCallback(ctx)) {
      return this.bot.getMessageCallbackData(ctx);
    }
    if (this.bot.isMessageCommand(ctx)) {
      return this.bot.getMessageText(ctx);
    }
    return null;
  }

  redirect(ctx, routerPath) {
    ctx.session.routerPath = routerPath;
    return this.resolve(ctx);
  }

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

  async resolve(ctx) {
    const { routerPath: pathname } = ctx.session;
    if (!pathname) {
      if (this.debug) this.log.warn('!pathname');
      return null;
    }
    if (this.debug) this.log.trace('resolve', pathname);
    const data = {
      ...this.provide(),
      pathname,
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
