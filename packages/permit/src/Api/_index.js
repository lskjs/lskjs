export default app => {
  const api = app.asyncRouter();
  const { wrapResoursePoint } = app.helpers;
  const resource = {};
  resource.findOne = async req => {
    const { _id } = req.data;
    if (!_id) throw '!_id';
    const { PermitModel } = app.models;
    const permit = await PermitModel.findOne({
      _id,
    });
    if (!permit) throw '!permit';
    if (permit.type === 'user.restorePassword') return PermitModel.prepare(permit, { req });
    if (!req.user || !req.user._id) throw '!userId';
    if (!permit) throw 'not found';
    if (app.hasGrant(req.user, 'superadmin') || String(permit.userId) === req.user._id) {
      return PermitModel.prepare(permit, { req });
    }
    throw '!permission';
  };
  api.use(
    '/',
    wrapResoursePoint(resource, {
      actions: Object.keys(resource),
    }),
  );
  return api;
};
