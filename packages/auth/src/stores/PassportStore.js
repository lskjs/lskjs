import { observable } from 'mobx';

export default uapp =>
  class PassportStore {
    @observable list = [];

    constructor(data) {
      if (data) {
        this.setData(data);
      }
    }

    static async getPassports() {
      const { data } = await uapp.api.fetch('/api/module/auth/social');
      return new this(data);
    }

    static async bindSocial(qs) {
      const { data } = await uapp.api.fetch('/api/module/auth/social/bind', {
        method: 'POST',
        qs,
      });
      return data;
    }

    static async unbindSocial(qs) {
      const { data } = await uapp.api.fetch('/api/module/auth/social/unbind', {
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
      uapp.log.info('bindSocial', data);
      this.list = data;
    }

    async disconnectSocial(provider) {
      const data = await this.constructor.unbindSocial({ provider });
      uapp.log.info('unbindSocial', data);
      this.list = this.list.filter(o => o.provider !== provider);
    }
  };
