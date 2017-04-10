import getController from './Auth.controller';
import getResource from './Auth.resource';

export default (ctx, params) => {
  const { isAuth } = ctx.middlewares;
  const api = ctx.asyncRouter();
  const controller = getController(ctx);
  const resource = getResource(ctx);
  // console.log(ctx.resourses.Auth, 'resource');
  api.all('/login', resource.login);
  api.post('/signup', resource.signup);
  api.all('/recovery', isAuth, resource.ecovery);
  api.all('/email/approve', resource.emailApprove);
  if (!controller) return api;
  // Регистрация пользователя через соц сеть
  api.all('/social', isAuth, controller.getSocials);
  api.all('/social/signup', controller.socialSign);
  api.all('/social/login', controller.socialLogin);
  // Добавление соц.сетей к пользователю
  api.all('/social/bind', isAuth, controller.socialBind);
  api.all('/social/unbind', isAuth, controller.socialUnbind);
  // social auth init
  api.get('/youtube', controller.youtubeAuth);
  api.get('/vkontakte', controller.vkAuth);
  // social auth callback
  api.get('/:provider/callback', controller.socialCallback);

  return api;
};
