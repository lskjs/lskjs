import { action, isComputedProp, toJS } from 'mobx';

import { ApiStore as BaseApiStore } from '../stores/ApiStore';

export class ApiStore extends BaseApiStore {
  // NOTE: скопировано из ./Store, увы в js нет множественного наследования
  getState() {
    return toJS(super.getState());
  }

  // NOTE: скопировано из ./Store, увы в js нет множественного наследования
  @action
  setState(state = {}) {
    Object.keys(state).forEach((item) => {
      if (isComputedProp(this, item)) return;
      this.setStateField(item, state[item]);
    });
  }
}

export default ApiStore;
