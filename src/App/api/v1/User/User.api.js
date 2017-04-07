import getController from './User.controller';

export default (ctx) => {
  const api = ctx.asyncRouter();
  const controller = getController(ctx);

  api.all('/list', controller.list);
  api.all('/length', controller.length);
  api.all('/get', controller.get);
  api.all('/edit', controller.edit);
  api.all('/update', controller.update);

  // api.get('/social/data', controller.getSocialData);
  // api.get('/social/data/update', controller.updateSocialData);

  return api;
};
