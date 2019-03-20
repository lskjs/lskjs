
export default async ({ query, uapp }) => {
  if (!uapp.rootState) uapp.rootState = {};


  const { Passport } = uapp.app.models;
  const passport = await Passport.getByToken(query.p);

  uapp.rootState.pageData = { passport };
  return uapp.rootState.pageData;
};
