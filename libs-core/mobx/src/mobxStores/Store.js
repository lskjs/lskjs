import { action, isComputedProp, toJS } from 'mobx';

import { Store as BaseStore } from '../stores/Store';

export class Store extends BaseStore {
  getState() {
    return toJS(super.getState());
  }

  @action
  setState(state = {}) {
    Object.keys(state).forEach((key) => {
      if (isComputedProp(this, key)) return;
      this.setStateField(key, state[key]);
    });
  }
}

export default Store;
