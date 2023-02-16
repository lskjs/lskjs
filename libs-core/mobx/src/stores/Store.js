import set from 'lodash/set';

export class Store {
  constructor(state = {}) {
    if (state) this.setState(state);
  }
  getState() {
    return this;
  }
  setStateField(item, value) {
    set(this, item, value);
  }
  setState(state = {}) {
    Object.keys(state).forEach((item) => {
      this.setStateField(item, state[item]);
    });
  }
}

export default Store;
