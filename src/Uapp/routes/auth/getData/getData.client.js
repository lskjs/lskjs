import fetch from 'isomorphic-fetch';
export default async ({ uapp }) => {
  // @TODO Andruxa
  if (!uapp.rootState) uapp.rootState = {};
  // const res = await fetch(`/api/v1/passport?p=${query.p}`);
  // const passport = await res.json();
  // uapp.rootState.pageData = { passport };
  // uapp.rootState.pageData = {};
  return uapp.rootState.pageData;
};
