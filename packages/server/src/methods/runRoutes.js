import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import isClass from '@lskjs/utils/isClass';
// import express from 'express';
import AsyncRouter from '../AsyncRouter';

const DEBUG = false;

export function getRoutesTree(ctx) {
  const iterate = (item) => {
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
  if (isPlainObject(val) || Array.isArray(val)) method = 'use';
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

function iterateRoute(data, parent = { path: '/' }) {
  if (DEBUG) console.warn('iterateRoute', parent); // eslint-disable-line no-console
  if (isPlainObject(data) || Array.isArray(data)) {
    const asyncRouter = AsyncRouter();

    let routes;
    let middlewares;
    if (Array.isArray(data)) {
      middlewares = data.slice(0, -1);
      routes = { '/': data[data.length - 1] };
    } else {
      middlewares = [];
      routes = data;
    }
    if (middlewares && middlewares.length) {
      asyncRouter.use(...middlewares);
    }

    forEach(routes, (val, key) => {
      const { path, method } = getMethodAndPath(key, val);
      const route = iterateRoute(val, { method, path, parent }); // , { path: params.path + path, i: params.i + 1 });
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
  // if (Array.isArray(data)) {
  //   const middlewares = data.slice(0, -1);
  //   const [routes] = data.slice(-1);
  //   // console.warn({routes});

  //   return iterateRoute(routes, { elem: data.length - 1, parent }); // , { path: params.path + path, i: params.i + 1 });

  //   // const subRouter = iterateRoute(routes, { elem: data.length - 1, parent }); // , { path: params.path + path, i: params.i + 1 });
  //   // const router = express.Router();
  //   // router.use(...middlewares, subRouter);

  //   // return router;
  // }

  if (DEBUG) console.warn('iterateRoute NOT FOUND CASE', parent); // eslint-disable-line no-console
  return () => {};
}

export default function () {
  if (this.Api) {
    this.rootApi = new this.Api({ app: this });
    const indexApi = get(this, 'rootApi.indexApi');
    if (indexApi && indexApi.getRoutesList) {
      this.log.trace('routes', indexApi.getRoutesList());
    }
  } else {
    // eslint-disable-next-line no-unused-expressions
    this.log ? this.log.warn('!app.Api') : console.warn('!app.Api'); // eslint-disable-line no-console
  }
  this.routes = getRoutesTree(this.rootApi);
  if (DEBUG) console.warn('this.routes', this.routes); // eslint-disable-line no-console
  const router = iterateRoute(this.routes);
  const asyncRouter = AsyncRouter();
  asyncRouter.use('/', router);
  this.express.use('/', asyncRouter);
  return this.express;
}
