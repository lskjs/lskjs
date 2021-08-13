import { action, isComputedProp, observable, toJS } from 'mobx';

import { EntityStore as BaseEntityStore } from '../stores/EntityStore';

export class EntityStore extends BaseEntityStore {
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

  @observable item = null;
  @observable loading = false;
  @observable fetchedAt = null;
  @observable filter = {};

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
