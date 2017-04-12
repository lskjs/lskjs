import { observable } from 'mobx';
import set from 'lodash/set';

export default ctx => (

  class Offer {

    @observable dealId;
    @observable status;

    constructor(offer) {
      if (offer) {
        this.setData(offer);
      }
    }

    static async getById(_id) {
      const offerData = await ctx.api.fetch(`/offer/${_id}`);
      return new this(offerData);
    }

    setData(offer) {
      for (const item in offer) {
        if (item === 'user') {
          set(this, item, new ctx.models.User(offer[item]));
        }
        set(this, item, offer[item]);
      }
      return true;
    }

  }

);
