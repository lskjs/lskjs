import { observable, computed, toJS } from 'mobx';

export default ctx => (

  class OffersStore {

    @observable list = [];

    static async getOffers(qs) {
      const { data } = await ctx.api.fetch('offer', { qs });
      return data.map(obj => new ctx.models.User(obj));
    }

    async fetchOffers(limit = 0, offset = this.list.length) {
      if (offset !== 0 && this.previousOffset === offset) {
        ctx.log.info('Offers with current offset already loaded');
        return false;
      }
      this.previousOffset = offset;
      const offers = await this.constructor.getOffers({ limit, offset });
      if (this.list.length > 0) {
        this.list = this.list.concat(offers);
      } else {
        this.list = offers;
      }
    }

    @computed get toJS() {
      return toJS(this.list);
    }

  }

);

