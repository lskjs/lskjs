export default (ctx) => {
  const api = ctx.asyncRouter();
  const { wrapResoursePoint } = ctx.helpers;
  const resource = {};
  resource.findOne = async (req) => {
    const { _id } = req.data;
    if (!_id) throw '!_id';
    const { PermitModel } = ctx.models;
    const permit = await PermitModel.findOne({
      _id,
    });
    if (!permit) throw '!permit';
    if (permit.type === 'user.restorePassword') return PermitModel.prepare(permit, { req });
    if (!req.user || !req.user._id) throw '!userId';
    if (!permit) throw 'not found';
    if (ctx.hasGrant(req.user, 'superadmin') || String(permit.userId) === req.user._id) {
      return PermitModel.prepare(permit, { req });
    }
    throw '!permission';
  };
  api.use('/', wrapResoursePoint(resource, {
    actions: Object.keys(resource),
  }));
  return api;
};
