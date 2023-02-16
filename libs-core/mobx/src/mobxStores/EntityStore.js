import { action, isComputedProp, observable, toJS } from 'mobx';

import { EntityStore as BaseEntityStore } from '../stores/EntityStore';

export class EntityStore extends BaseEntityStore {
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

  @observable item = null;
  @observable loading = false;
  @observable fetchedAt = null;
  @observable filter = {};

  // NOTE: увы, мы вынуждены повторять этот конструктор, из-за цепочки наследования Babel
  constructor(state = {}) {
    super();
    if (state) this.setState(state);
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

export default EntityStore;
