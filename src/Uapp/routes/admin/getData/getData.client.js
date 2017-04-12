export default (ctx) => {
  if (!ctx.rootState) ctx.rootState = {}
  return ctx.rootState.pageData
}
