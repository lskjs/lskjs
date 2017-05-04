import { action, observable } from 'mobx';
import set from 'lodash/set';

export default ctx => (

  class DealModel {

    @observable status;
    @observable info = {
      content: undefined,
    };

    constructor(deal) {
      if (deal) {
        this.setData(deal);
      }
    }

    static async getById(_id) {
      const { data } = await ctx.api.fetch(`/api/module/deal/${_id}`);
      return new this(data);
    }

    static async acceptDeal(_id) {
      const { data } = await ctx.api.fetch(`/api/module/deal/${_id}/accept`);
      return data;
    }

    static async rejectDeal(_id) {
      const { data } = await ctx.api.fetch(`/api/module/deal/${_id}/reject`);
      return data;
    }

    setData(deal) {
      for (const item in deal) {
        if (item === 'user') {
          set(this, item, new ctx.models.User(deal[item]));
        } else {
          set(this, item, deal[item]);
        }
      }
    }

    @action
    async changeStatus(status) {
      let deal = null;
      if (status === 'accept') {
        deal = await this.constructor.acceptDeal(this._id);
      } else if (status === 'reject') {
        deal = await this.constructor.rejectDeal(this._id);
      }
      if (deal) this.setData(deal);
    }


  }

);
