export default (ctx, module) => {
  const api = ctx.asyncRouter();
  const { wrapResoursePoint } = ctx.helpers;

  const resource = {
    // async list(req) {
    //   const { User } = ctx.modules;
    //   const user = await User.findOne();
    //   return req.template;
    // },
    async test() {
      return 'test';
    },
    async email(req) {
      const { User: UserModel } = ctx.models;
      const user = await UserModel.findOne();
      const { data } = req;
      const { template } = req.data;
      // console.log({ template });
      return module.renderTemplate({
        ...module.getMailerParams(user),
        ...template,
        ...data,
      });
    },
  };

  api.use(
    '/',
    wrapResoursePoint(resource, {
      actions: Object.keys(resource),
    }),
  );
  return api;
};
