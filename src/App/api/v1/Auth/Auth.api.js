import getResource from './Auth.resource';

export default (ctx, params) => {
  const api = ctx.asyncRouter();
  const resource = new getResource(ctx);

  api.all('/login', resource.login);
  api.post('/signup', resource.signup);
  api.all('/recovery', resource.recovery);
  api.all('/social/signup', resource.socialSignup);
  api.all('/social/login', resource.socialLogin);
  api.get('/vkontakte', resource.authVkontakte);
  api.get('/:provider/callback', resource.socialCallback);

  return api;
};
