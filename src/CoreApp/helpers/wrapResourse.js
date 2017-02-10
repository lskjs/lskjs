import asyncRouter from 'lego-starter-kit/utils/AsyncRouter';

export default (ctx) => {
  return function wrapResourse(resourse, params = {}) {
    const api = params.api || params.router || asyncRouter();
    const prefix = params.prefix || '';
    const middleware = params.middleware || function () {};
    api.get(`${prefix}/`, middleware, resourse.list);
    api.post(`${prefix}/`, middleware, resourse.create);
    api.get(`${prefix}/:id`, middleware, resourse.get);
    api.all(`${prefix}/:id/create`, middleware, resourse.create);
    api.put(`${prefix}/:id`, middleware, resourse.update);
    api.all(`${prefix}/:id/update`, middleware, resourse.update);
    api.delete(`${prefix}/:id`, middleware, resourse.remove);
    api.all(`${prefix}/:id/remove`, middleware, resourse.remove);
    return api;
  };
};
