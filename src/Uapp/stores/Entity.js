import set from 'lodash/set';
import { toJS } from 'mobx';

export default ctx => class Entity {
  // static api = () => {};

  constructor(state = {}) {
    if (state) this.setState(state);
  }

  setState(state = {}) {
    for (const item in state) {
      set(this, item, state[item]);
    }
  }
  toJS() {
    return toJS(this);
  }

  async setRemoteState(fn, state = {}) {
    const oldState = this.toJS();
    this.setState(state);
    try {
      const newState = await fn(state);
      this.setState(newState);
    } catch (err) {
      this.setState(oldState);
      throw err;
    }
  }

  async createOrUpdate(rawData) {
    return this.setRemoteState((data) => {
      if (!data._id) {
        return this.constructor.api().create(data);
      }
      return this.constructor.api().update(this._id, data);
    }, rawData);
  }

  async remove() {
    await this.constructor.api().remove(this._id);
  }

}
