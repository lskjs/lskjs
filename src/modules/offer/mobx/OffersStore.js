import { observable, computed, toJS } from 'mobx';

export default (ctx, module) => (

  class OffersStore {

    @observable list = [];

    static async getOffers(qs) {
      const { data } = await ctx.api.fetch('/api/module/offer', { qs });
      return data.map(obj => new module.stores.OfferModel({ offer: obj }));
    }

    async fetchOffers(limit = 0, offset = this.list.length) {
      if (offset !== 0 && this.previousOffset === offset) {
        ctx.log.info('Offers with current offset already loaded');
        return false;
      }
      this.previousOffset = offset;
      const offers = await this.constructor.getOffers({ limit, offset });
      const filtered = offers.filter(o => o.status !== 'finished');
      if (this.list.length > 0) {
        this.list = this.list.concat(filtered);
      } else {
        this.list = filtered;
      }
      return true;
    }

    @computed get toJS() {
      return toJS(this.list);
    }

  }

);
