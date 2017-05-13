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

    const actions = {
      list(req) {
        return Model.findByParams(req.data);
      },

      create(req) {
        return Model.create(req.body);
      },

      get(req) {
        const id = req.query._id;
        return Model.findById(id).then(ctx.helpers.checkNotFound);
      },
      update(req) {
        const id = req.query._id;
        return Model.findByIdAndUpdate(id, req.body, { new: true }).then(ctx.helpers.checkNotFound);
      },
      remove(req) {
        const id = req.query._id;
        return Model.findByIdAndRemove(id).then(ctx.helpers.checkNotFound);
      },
    };

    actionNames.forEach((actionName) => {
      actions[lowercaseFirstLetter(actionName.substr('action'.length))] = Model[actionName];
    });

    return actions;
  };
};
