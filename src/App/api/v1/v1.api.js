
export default (ctx, params) => {
  const api = ctx.asyncRouter();
  api.all('/test', async () => {
    const  {User} = ctx.models;
    const users = await User.find();
    return {asd:'test'}
  });
  api.all('*', () => {
    throw ctx.errors.e404('No such API method');
  });
  return api;
};
