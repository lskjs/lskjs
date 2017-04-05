import fetch from 'isomorphic-fetch';
export default async ({ ctx }) => {
  // @TODO Andruxa
  if (!ctx.rootState) ctx.rootState = {};
  // const res = await fetch(`/api/v1/passport?p=${query.p}`);
  // const passport = await res.json();
  // ctx.rootState.pageData = { passport };
  // ctx.rootState.pageData = {};
  return ctx.rootState.pageData;
};
