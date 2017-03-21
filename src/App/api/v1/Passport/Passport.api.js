import getResource from './Passport.resource';

export default (ctx, params) => {
  const api = ctx.asyncRouter();
  const resource = new getResource(ctx);

  api.get('/', resource.get);

  return api;
};