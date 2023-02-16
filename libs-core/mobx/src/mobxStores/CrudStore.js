import { action, isComputedProp, toJS } from 'mobx';

import { CrudStore as BaseModel } from '../stores/CrudStore';

export class CrudStore extends BaseModel {
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

export default CrudStore;
