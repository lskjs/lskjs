import { action, isComputedProp, toJS } from 'mobx';

import { ApiStore as BaseModel } from '../stores2/ApiStore';

export class ApiStore extends BaseModel {
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

export default ApiStore;
