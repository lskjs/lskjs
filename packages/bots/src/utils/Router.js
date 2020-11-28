import UniversalRouter from 'universal-router';
import get from 'lodash/get';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import concat from 'lodash/concat';
import last from 'lodash/last';

export function getCBData(ctx) {
  return get(ctx, 'update.callback_query.data', null);
}

const cbQueryHlp = (route, ctx) => {
  const cbData = getCBData(ctx);
  console.log('cbData', cbData);

  const splittedCb = `${cbData}`.split(':');
  const splittedCbType = get(splittedCb, '0', null);
  const splittedCbPath = get(splittedCb, '1', null);

  console.log('splittedCb', splittedCb);
  if (ctx.updateType === 'callback_query') {
    if (splittedCbType === 'redirect' && splittedCbPath) {
      const splittedPathArray = splittedCbPath.split('/');
      if (splittedCbPath[0] === '/') {
        route = splittedPathArray;
      } else {
        route = concat(route, splittedPathArray);
      }
    } else {
      route.push('callback_query');
    }
  } else if (ctx.updateType === 'message') {
    if (`${get(ctx, 'message.text', '')}`.indexOf('/start') !== -1) {
      route = ['start'];
    } else if (route.indexOf('message') === -1) {
      route.push('message');
    }
  }
  return route;
};

export function defineRouterPath({ route = '', ctx } = {}) {
  if (!isString(route)) {
    route = '';
  }
  route = route.split('/');
  route = isArray(route) ? route : [];

  console.log(route);

  if (route === undefined || !route) {
    route.push('start');
  } else {
    route = cbQueryHlp(route, ctx);
  }
  console.log('ROUTE_ARRAY', route);
  return route.join('/');
}

class Router {
  constructor({ bot, routes, logger = () => console.log, errorCb = () => {} }) {
    this.bot = bot;
    this.routes = routes;
    this.logger = logger;
    this.router = new UniversalRouter(this.routes);
    this.ctx = null;
    this.errorCb = errorCb;

    this.bot.use(async (ctx, next) => {
      ctx.session.routerPath = defineRouterPath({
        route: ctx.session.routerPath,
        ctx,
      });
      this.ctx = ctx;

      await this.resolve(ctx);
      return next(ctx);
    });
  }

  async redirect(path, ctx) {
    this.ctx.session.routerPath = path;
    await this.resolve(ctx);
  }

  async resolve(ctx) {
    console.log('resolvePath', this.ctx.session.routerPath);
    const data = {
      pathname: this.ctx.session.routerPath,
      ctx,
      router: this,
    };
    try {
      await this.router.resolve(data);
    } catch (e) {
      console.error('Router exception', e.message);
      this.errorCb(data, e);
    }
  }
}
