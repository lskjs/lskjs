export default (ctx) => {
  return function getCheckNotFound(data) {
    return (name = 'Object') => {
      if (!data) throw ctx.errors.e404(name + ' not found');
      return Promise.resolve(data);
    }
  };
};


    checkNotFound(data) {
      if (!data) throw ctx.errors.e404(name +' not found');
      return Promise.resolve(data);
    },


    this.find().then(checkNotFound.)
    createResourse(Model) {
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
    },

    wrapResourse(resourse, params = {}) {
      const api = params.api || asyncRouter();
      const prefix = params.prefix || '';
      const middleware = params.middleware || function () {};
      api.get(`${prefix}/`, middleware, resourse.list);
      api.post(`${prefix}/`, middleware, resourse.create);
      api.get(`${prefix}/:id`, middleware, resourse.get);
      api.all(`${prefix}/:id/create`, middleware, resourse.create);
      api.put(`${prefix}/:id`, middleware, resourse.update);
      api.all(`${prefix}/:id/update`, middleware, resourse.update);
      api.delete(`${prefix}/:id`, middleware, resourse.remove);
      api.all(`${prefix}/:id/remove`, middleware, resourse.remove);
      return api;
    },
  };
};
