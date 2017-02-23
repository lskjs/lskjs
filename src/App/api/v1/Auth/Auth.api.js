import getResource from './Auth.resource';

export default (ctx, params) => {
  const api = ctx.asyncRouter();
  const resource = new getResource(ctx);

  api.all('/login', resource.login);
  api.post('/signup', resource.signup);
  api.all('/recovery', resource.recovery);

  return api;
};
