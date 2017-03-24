import asyncRouter from 'lego-starter-kit/utils/AsyncRouter';
import getController from './passport.controller';

export default(ctx, parent) => {
  const { e404 } = ctx.errors;
  const controller = getController(ctx, parent);

  const api = asyncRouter();
  api.get('/', controller.get);
  return api;
};
