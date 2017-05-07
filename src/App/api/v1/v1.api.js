
export default (ctx, params) => {
  const api = ctx.asyncRouter();
  api.all('*', () => {
    throw ctx.errors.e404('No such API method');
  });
  return api;
};
