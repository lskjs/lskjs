import { action, isComputedProp, observable, toJS } from 'mobx';

import { FetchStore as BaseFetchStore } from '../stores/FetchStore';

export class FetchStore extends BaseFetchStore {
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

  @observable items = [];
  @observable count = null;
  @observable skip = 0;
  @observable limit = 10;
  @observable loading = false;
  @observable fetchedAt = null;
  @observable select = {};
  @observable err = {};
  @observable fetchCallback;

  // NOTE: увы, мы вынуждены повторять этот конструктор, из-за цепочки наследования Babel
  constructor(state = {}) {
    super();
    if (state) this.setState(state);
  }

  @action
  setItems(...args) {
    return super.setItems(...args);
  }

  @action
  fetch(...args) {
    return super.fetch(...args);
  }

  @action
  cancelFetch(...args) {
    return super.cancelFetch(...args);
  }
}

export default FetchStore;
