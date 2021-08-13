import { action, observable } from 'mobx';

import { FetchStore as BaseFetchStore } from '../stores/FetchStore';

export class FetchStore extends BaseFetchStore {
  @observable items = [];
  @observable count = null;
  @observable skip = 0;
  @observable limit = 10;
  @observable loading = false;
  @observable fetchedAt = null;
  @observable select = {};
  @observable err = {};
  @observable fetchCallback;

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
