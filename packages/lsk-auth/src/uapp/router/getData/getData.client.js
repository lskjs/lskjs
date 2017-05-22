export default async ({ uapp }) => {
  if (!uapp.rootState) uapp.rootState = {};
  return uapp.rootState.pageData;
};
