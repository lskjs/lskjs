
export default async ({ app, query, ctx }) => {
  if (!ctx.rootState) ctx.rootState = {};


  const { Passport } = app.models;
  const passport = await Passport.getByToken(query.p);

  ctx.rootState.pageData = { passport };
  return ctx.rootState.pageData;
};
