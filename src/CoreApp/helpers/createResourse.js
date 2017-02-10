export default (ctx) => {
  return function createResourse(Model) {
    return {
      list() {
        return Model.find({});
      },
      create(req) {
        const data = req.allParams();
        return Model.create(data);
      },
      get(req) {
        const id = req.params.id;
        return Model.findById(id).then(ctx.helpers.checkNotFound);
      },
      update(req) {
        const id = req.allParams().id;
        const data = req.allParams();
        return Model.findByIdAndUpdate(id, data, { new: true }).then(ctx.helpers.checkNotFound);
      },
      remove(req) {
        const id = req.allParams().id;
        return Model.findByIdAndRemove(id).then(ctx.helpers.checkNotFound);
      },
    };
  };
};
