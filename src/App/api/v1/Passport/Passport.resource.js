export default (ctx) => {
  const { Passport } = ctx.models;
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
