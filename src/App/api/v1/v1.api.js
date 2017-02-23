import getAuth from './Auth';
import getUser from './User';

export default (ctx, params) => {
  const api = ctx.asyncRouter();

  api.use('/auth', getAuth(ctx, params));
  api.use('/user', getUser(ctx, params));

  api.all('*', () => {
    return 'Example API working';
  });

  return api;
};
