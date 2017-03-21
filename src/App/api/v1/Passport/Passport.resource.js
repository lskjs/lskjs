export default (ctx) => {
  const { User, Passport } = ctx.models;
  const { e400 } = ctx.errors;
  const resource = {

    get: async (req) => {
      const { p } = req.data;
      const passport = await Passport.getByToken(p);
      return {
        ...passport.toJSON(),
        __pack: 1,
      };
    },

  };

  return resource;
};
