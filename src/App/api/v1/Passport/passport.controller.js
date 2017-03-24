export default (ctx) => {
  const { _checkNotFound } = ctx.helpers;
  const { e400 } = ctx.errors;
  const { User, Passport } = ctx.models;
  const controller = {};
  controller.get = async (req) => {
    const { p } = req.data;
    const passport = await Passport.getByToken(p);
    return {
      ...passport.toJSON(), __pack: 1,
    };
  };
  return controller;
};
