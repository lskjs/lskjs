import getController from './User.controller';

export default (ctx, params) => {
  const api = ctx.asyncRouter();
  const controller = getController(ctx);

  api.all('/list', controller.list);
  api.all('/get', controller.get);
  api.all('/edit', controller.edit);
  api.all('/update', controller.update);

  return api;
};
