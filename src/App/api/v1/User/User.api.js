import getResource from './User.resource';

export default (ctx, params) => {
  const api = ctx.asyncRouter();
  const resource = new getResource(ctx);

  api.all('/get', resource.get);
  api.all('/edit', resource.edit);

  return api;
};
