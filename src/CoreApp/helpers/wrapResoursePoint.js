import asyncRouter from 'lego-starter-kit/utils/AsyncRouter';

export default (ctx) => {
  return function wrapResoursePoint(resourse, params = {}) {
    const api = params.api || params.router || asyncRouter();
    const prefix = params.prefix || '';
    const middleware = params.middleware || function () {};
    const actions = params.actions || Object.keys(resourse); // ['list', 'get', 'create', 'update', 'remove'];

    actions.forEach((action) => {
      if (!resourse[action]) return;
      api.all(`${prefix}/${action}`, middleware, resourse[action]);
    });
    return api;
  };
};
