import getModels from './models';
import getControllers from './controllers';

export default ctx => (

  class PostsModule {

    async init() {
      this.models = getModels(ctx);
      this.controllers = getControllers(ctx);
    }

    async run() {
      ctx.app.use('/api/module/posts', this.getApi());
    }

    getApi() {
      const api = ctx.asyncRouter();
      const { Post } = this.controllers;

      api.get('/', Post.all);
      api.post('/create', Post.create);
      api.get('/:id', Post.get);
      api.put('/:id', Post.edit);
      api.delete('/:id', Post.delete);

      return api;
    }

  }

);
