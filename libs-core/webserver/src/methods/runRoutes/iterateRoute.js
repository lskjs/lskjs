import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';

import AsyncRouter from '../../AsyncRouter';
import parseMethodAndPath from './parseMethodAndPath';

const DEBUG = false;

function iterateRoute(item, parent = { path: '/' }) {
  if (DEBUG) console.warn('iterateRoute', parent); // eslint-disable-line no-console
  if (isFunction(item)) return item;
  if (isPlainObject(item) || Array.isArray(item)) {
    const asyncRouter = AsyncRouter();

    let routes;
    let middlewares;
    if (Array.isArray(item)) {
      middlewares = item.slice(0, -1);
      routes = { '/': item[item.length - 1] };
    } else {
      middlewares = [];
      routes = item;
    }
    if (middlewares && middlewares.length) {
      asyncRouter.use(...middlewares);
    }

    forEach(routes, (val, key) => {
      const { path, method } = parseMethodAndPath(key, val);
      const route = iterateRoute(val, { method, path, parent }); // , { path: params.path + path, i: params.i + 1 });
      asyncRouter[method](path, route);
    });
    return asyncRouter;
  }

  if (DEBUG) console.warn('iterateRoute NOT FOUND CASE', parent); // eslint-disable-line no-console
  // TODO: return null
  return () => {};
}

export default iterateRoute;

// import mapValues from 'lodash/mapValues';
// import isClass from '@lskjs/utils/isClass';
// export function getRoutesTree(ctx) {
//   const iterate = (item) => {
//     if (!item) return null;
//     if (isClass(item)) {
//       const api = new item(ctx); // eslint-disable-line new-cap
//       return api && isFunction(api.getRoutes) && api.getRoutes();
//     }
//     if (!isPlainObject(item)) {
//       if (item.getRoutes) {
//         return item.getRoutes();
//       }
//       if (item.routes) {
//         return item.routes;
//       }
//       return item;
//     }
//     return mapValues(item, iterate);
//   };
//   if (ctx && ctx.getRoutes && isFunction(ctx.getRoutes)) {
//     return iterate(ctx.getRoutes());
//   }
//   return {};
// }
