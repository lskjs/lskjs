import { action, isComputedProp, toJS } from 'mobx';

import { CrudStore as BaseModel } from '../stores2/CrudStore';

export class CrudStore extends BaseModel {
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

export default CrudStore;
