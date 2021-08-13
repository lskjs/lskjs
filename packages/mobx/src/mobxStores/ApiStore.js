import { action, isComputedProp, toJS } from 'mobx';

import { ApiStore as BaseModel } from '../stores/ApiStore';

export class ApiStore extends BaseModel {
  // TODO: скопировано из ./Store
  getState() {
    return toJS(super.getState());
  }

  // TODO: скопировано из ./Store
  @action
  setState(state = {}) {
    Object.keys(state).forEach((item) => {
      if (isComputedProp(this, item)) return;
      this.setStateField(item, state[item]);
    });
  }
}

export default ApiStore;
