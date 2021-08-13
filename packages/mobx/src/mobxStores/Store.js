import { action, isComputedProp, toJS } from 'mobx';

import { Store as BaseStore } from '../stores/Store';

export class Store extends BaseStore {
  getState() {
    return toJS(super.getState());
  }

  @action
  setState(state = {}) {
    Object.keys(state).forEach((item) => {
      if (isComputedProp(this, item)) return;
      this.setStateField(item, state[item]);
    });
  }
}

export default Store;
