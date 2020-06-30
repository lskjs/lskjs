import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import isClass from '@lskjs/utils/isClass';
import AsyncRouter from '../AsyncRouter';

// import isClass from 'lodash/isClass';
// const isClass = () => false;

export function getRoutes(ctx) {
  const iterate = item => {
    if (!item) return null;
    if (isClass(item)) {
      const api = new item(ctx); // eslint-disable-line new-cap
      return api && isFunction(api.getRoutes) && api.getRoutes();
    }
    if (!isPlainObject(item)) {
      if (item.getRoutes) {
        return item.getRoutes();
      }
      if (item.routes) {
        return item.routes;
      }
      return item;
    }
    return mapValues(item, iterate);
  };
  if (ctx && ctx.getRoutes && isFunction(ctx.getRoutes)) {
    return iterate(ctx.getRoutes());
  }
  return {};
}

function getMethodAndPath(key = '', val) {
  let method;
  if (isPlainObject(val)) method = 'use';
  const chunk = key.trim().split(' ');
  let path;
  if (chunk.length >= 2) {
    [method, path] = chunk;
  } else {
    [path] = chunk;
  }
  if (!method) method = 'all';
  return {
    path,
    method: method.toLowerCase(),
  };
}

function iterateRoute(data, { AsyncRouter } = {}) {
  // params
  if (isPlainObject(data)) {
    const asyncRouter = AsyncRouter();
    forEach(data, (val, key) => {
      const { path, method } = getMethodAndPath(key, val);
      const route = iterateRoute(val, { AsyncRouter }); // , { path: params.path + path, i: params.i + 1 });
      // console.log('asyncRouter', method, path);
      asyncRouter[method](path, route);
    });
    return asyncRouter;
  }
  if (isFunction(data)) {
    return data;
  }
  if (data && data.getRoutes && isFunction(data.getRoutes)) {
    return data.getRoutes();
  }
  if (data && data.api && isFunction(data.api)) {
    return data.api();
  }
  return () => {};
}

export default function() {
  if (this.Api) {
    this.rootApi = new this.Api({ app: this });
    const indexApi = get(this, 'rootApi.indexApi');
    if (indexApi && indexApi.getRoutesList) {
      this.log.trace('routes', indexApi.getRoutesList());
    }
  } else {
    this.log.warn('!app.Api');
  }
  this.routes = getRoutes(this.rootApi);
  const asyncRouter = AsyncRouter();
  const router = iterateRoute(this.routes, { AsyncRouter, path: '/', i: 1 });
  asyncRouter.use('/', router);
  this.express.use('/', asyncRouter);
  return this.express;
}
