import getController from './Auth.controller';

export default (ctx, params) => {
  const api = ctx.asyncRouter();
  const controller = getController(ctx);
  // console.log(ctx.resourses.Auth, 'resource');
  api.all('/login', ctx.resourses.Auth.login);
  api.post('/signup', ctx.resourses.Auth.signup);
  api.all('/recovery', ctx.resourses.Auth.recovery);
  // Регистрация пользователя через соц сеть
  api.all('/social/signup', controller.socialSign);
  api.all('/social/login', controller.socialLogin);
  // social auth init
  api.get('/youtube', controller.youtubeAuth);
  api.get('/vkontakte', controller.vkAuth);
  // social auth callback
  api.get('/:provider/callback', controller.socialCallback);

  return api;
};
