import getAuth from './Auth';
import getUser from './User';
import getPassport from './Passport';

export default (ctx, params) => {
  const api = ctx.asyncRouter();

  api.use('/auth', getAuth(ctx, params));
  api.use('/user', getUser(ctx, params));
  api.use('/passport', getPassport(ctx, params));

  api.all('*', () => {
    throw ctx.errors.e404('No such API method');
  });

  return api;
};
