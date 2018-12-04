import { observable } from 'mobx';

export default (ctx, mctx) => (

  class PassportsStore {
    @observable list = [];

    constructor(data) {
      if (data) {
        this.setData(data);
      }
    }

    static async getPassports() {
      const { data } = await ctx.api.fetch('/api/module/auth/social');
      return new this(data);
    }

    static async bindSocial(qs) {
      const { data } = await ctx.api.fetch('/api/module/auth/social/bind', {
        method: 'POST',
        qs,
      });
      return data;
    }

    static async unbindSocial(qs) {
      const { data } = await ctx.api.fetch('/api/module/auth/social/unbind', {
        method: 'POST',
        qs,
      });
      return data;
    }

    setData(data) {
      this.list = data;
    }

    async connectSocial(token) {
      const data = await this.constructor.bindSocial({ p: token });
      ctx.log.info('bindSocial', data);
      this.list = data;
    }

    async disconnectSocial(provider) {
      const data = await this.constructor.unbindSocial({ provider });
      ctx.log.info('unbindSocial', data);
      this.list = this.list.filter(o => o.provider !== provider);
    }
  }
);
