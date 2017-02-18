
export default async (ctx, app) => {
  if (!ctx.rootState) ctx.rootState = {}

  const { Category, Game } = app.models

  const categories = await Category.find()
  const games = await Game.find()
  const data = {
    games,
    categories,
  }

  ctx.rootState.pageData = data
  return ctx.rootState.pageData
}
