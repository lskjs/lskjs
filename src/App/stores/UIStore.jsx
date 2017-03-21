import { observable, action } from 'mobx';

export default class UIStore {

  @observable statusRequest = null;

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
