import set from 'lodash/set';
import { toJS, isComputedProp } from 'mobx';

export default class Store {
  constructor(state = {}) {
    if (state) this.setState(state);
  }

  toJS() {
    return toJS(this);
  }

  setStateField(item, value) {
    if (isComputedProp(this, item)) {
      // Some code
    } else {
      set(this, item, value);
    }
  }

  setState(state = {}) {
    for (const item in state) {
      this.setStateField(item, state[item]);
    }
  }
}
