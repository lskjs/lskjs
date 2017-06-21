import asyncRouter from 'lego-starter-kit/utils/AsyncRouter';

export default (ctx) => {
  return function wrapResoursePoint(resourse, params = {}) {
    const api = params.api || params.router || asyncRouter();
    const prefix = params.prefix || null;
    const middleware = params.middleware || null;
    const actions = params.actions || Object.keys(resourse); // ['list', 'get', 'create', 'update', 'remove'];

    actions.forEach((action) => {
      if (!resourse[action]) return;
      const args = [
        [prefix, action].filter(a => !!a).join('/'),
        middleware,
        resourse[action]
      ].filter(a => !!a);

      if (args[0] !== '/') {
        args[0] = '/' + args[0];
      }
      api.all(...args);
    });
    return api;
  };
};
