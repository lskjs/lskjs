import { observable, action } from 'mobx';

export default class UIStore {

  @observable statusRequest = null;

  @action
  status(value = null) {
    const val = value === 0 && 'ok' || value > 0 && 'error' || value;
    this.statusRequest = val;
    if (['ok', 'error'].includes(val)) {
      setTimeout(() => {
        this.statusRequest = null;
      }, 1000);
    }
  }

}
