// import { createRoute, createSocketNamespace } from 'universal-model';
import asyncRouter from 'lego-starter-kit/utils/AsyncRouter';

export default function getApi(ctx, params) {
  const api = ctx.asyncRouter();

  // api.all('/universal', createRoute({ ...ctx, models }));
  // ctx.app.ws('/universal', createSocketNamespace({ ...ctx, models }))

  // api.all('/universal-socket', createRoute({...ctx, models, socket: true}));
  api.all('/auth/login', ctx.resourses.Auth.login);
  api.all('/auth/signup', ctx.resourses.Auth.signup);
  api.all('/auth/recovery', ctx.resourses.Auth.recovery);
  api.all('/auth/recovery', ctx.resourses.Auth.recovery);
  // api.all('/rpc', createRpcRoute(ctx.models))


  api.all('*', () => 'Mobx API working');
  return api;
}
