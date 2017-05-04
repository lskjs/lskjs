import { action, observable } from 'mobx';
import set from 'lodash/set';
import sortBy from 'lodash/sortBy';

export default (ctx, module) => (

  class OfferModel {

    @observable _id;
    @observable dealId;
    @observable status;
    @observable deals = [];

    constructor({ offer, deals }) {
      if (offer) this.setData(offer);
      if (deals) this.deals = deals;
    }

    static async getById(_id) {
      const { data: offer } = await ctx.api.fetch(`/api/module/offer/${_id}`);
      const deals = await this.getDeals(_id);
      return new this({ offer, deals });
    }

    static async getDeals(_id) {
      const { data } = await ctx.api.fetch(`/api/module/offer/${_id}/deals`);
      const sorted = sortBy(sortBy(data, deal => deal.status !== 'review'), deal => deal.status !== 'accepted');
      return sorted.map(deal => new module.stores.DealModel(deal));
    }

    static async editOffer(_id, body) {
      const { data } = await ctx.api.fetch(`/api/module/offer/${_id}/`, {
        method: 'PUT',
        body,
      });
      ctx.log.info(data);
      return data;
    }

    @action
    addNewDeal = (deal) => {
      const newDeal = new module.stores.DealModel(deal);
      this.deals.push(newDeal);
    }

    @action
    async changeStatus(status) {
      const offer = await this.constructor.editOffer(this._id, { status });
      this.setData(offer);
    }

    setData(offer) {
      for (const item in offer) {
        if (item === 'user') {
          set(this, item, new ctx.models.User(offer[item]));
        } else {
          set(this, item, offer[item]);
        }
      }
    }


  }

);
