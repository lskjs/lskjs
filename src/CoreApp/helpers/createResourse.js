import getClassInfo from './getClassInfo';
function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
export default (ctx) => {
  return function createResourse(Model) {
    const info = getClassInfo(Model);
    const actionNames = info.staticMethods
      .filter(a => a.substr(0, 'action'.length) === 'action');

    const prepare = (rawModel) => {
      if (!rawModel) return rawModel;
      if (!Model.prepare) return rawModel;
      return Model.prepare(rawModel);
    };
    const actions = {
      async list(req) {
        const rawModel = await Model.findByParams(req.data);
        return prepare(rawModel);
      },

      async create(req) {
        const rawModel = await Model.create(req.body);
        return prepare(rawModel);
      },

      async get(req) {
        const id = req.query._id;
        const rawModel = await Model.findById(id).then(ctx.helpers.checkNotFound);
        return prepare(rawModel);
      },
      async update(req) {
        const id = req.query._id;
        const rawModel = await Model.findByIdAndUpdate(id, req.body, { new: true }).then(ctx.helpers.checkNotFound);
        return prepare(rawModel);
      },
      async remove(req) {
        const id = req.query._id;
        const rawModel = await Model.findByIdAndRemove(id).then(ctx.helpers.checkNotFound);
        return prepare(rawModel);
      },
    };

    actionNames.forEach((actionName) => {
      actions[lowercaseFirstLetter(actionName.substr('action'.length))] = Model[actionName];
    });

    return actions;
  };
};
