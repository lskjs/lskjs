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
