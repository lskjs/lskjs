import getController from './User.controller';

export default (ctx, params) => {
  const api = ctx.asyncRouter();
  const resource = getController(ctx);

  api.all('/list', resource.list);
  api.all('/length', resource.length);
  api.all('/get', resource.get);
  api.all('/edit', resource.edit);

  return api;
};
