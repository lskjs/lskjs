
export default async ({ query, uapp }) => {
  const { Passport } = uapp.app.modules.auth.models;
  if (!uapp.rootState) uapp.rootState = {};

  const passport = await Passport.getByToken(query.p);

  uapp.rootState.pageData = { passport };
  return uapp.rootState.pageData;
};
