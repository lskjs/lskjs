import Store from './Store';

export default class EntityStore extends Store {
  async setRemoteState(fn, state = {}) {
    const oldState = this.toJS();
    this.setState(state);
    try {
      const newState = await fn(state);
      this.setState(newState);
      return newState;
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
