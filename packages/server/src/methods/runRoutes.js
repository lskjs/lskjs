import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';

function getMethodAndPath(key = '', val) {
  let method;
  if (isPlainObject(val)) method = 'use';
  const chunk = key.split(' ');
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


export default function () {
  const iterate = (data) => { // params
    // console.log('iterate', params, {
    //   getRouter: !!data.getRouter,
    //   isPlainObject: isPlainObject(data),
    //   isFunction: isFunction(data),
    // });
    if (isPlainObject(data)) {
      const subRouter = this.asyncRouter();
      forEach(data, (val, key) => {
        const { path, method } = getMethodAndPath(key, val);
        const route = iterate(val); // , { path: params.path + path, i: params.i + 1 });
        // console.log('subRouter', method, path);
        subRouter[method](path, route);
      });
      return subRouter;
    } if (isFunction(data)) {
      return data;
    } if (data && data.getRoutes) {
      return data.getRoutes();
    }
    return () => {};
  };
  const asyncRouter = this.asyncRouter();
  const router = iterate(this.routes, { path: '/', i: 1 });
  asyncRouter.use('/', router);
  this.app.use('/', asyncRouter);
  this.app.use('*', (req, ...args) => {
    req.url = req.originalUrl;
    this.reactApp.render(req, ...args);
  });
  // return () => 'asdadfgd';
  // return iterate(this.apiRouter);
}
