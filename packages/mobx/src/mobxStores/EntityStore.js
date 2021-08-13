import { action, observable } from 'mobx';

import { EntityStore as BaseEntityStore } from '../stores/EntityStore';

export class EntityStore extends BaseEntityStore {
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
