import { observable, action } from 'mobx';

export default class UIStore {

  @observable statusRequest = null;

  constructor(store) {
    this.store = store;
  }

  // value = 'ok'|'wait'|'error'
  @action
  status(value = null) {
    this.statusRequest = value;
    if (['ok', 'error'].includes(value)) {
      setTimeout(() => {
        this.statusRequest = null;
      }, 1000);
    }
  }

}
