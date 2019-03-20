import { observable, action, computed } from 'mobx';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
import unionBy from 'lodash/unionBy';
import omit from 'lodash/omit';
import Store from './Store';

export default class SelectStore extends Store {
  idKey = '_id'
  @observable.shallow items = []; // Массив объектов

  getCount() {
    return this.list.length;
  }

  findItemIndex(item = {}) {
    return findIndex(this.items, pick(item, [this.idKey]));
  }

  isChecked(item) {
    return this.findItemIndex(item) >= 0;
  }

  unselectAll() {
    this.items.clear();
  }

  @action
  toggle(item = {}) {
    const index = this.findItemIndex(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    } else {
      this.items.push(item);
    }
  }

  globalIsChecked() {
    return (
      this.items.length > 0 &&
      this.items.length >= this.listStore.items.length &&
      unionBy(this.items, this.listStore.items, this.idKey).length === this.items.length
    );
  }

  @action.bound
  globalToggle() {
    if (this.globalIsChecked()) {
      this.items.clear();
    } else {
      this.listStore.items.forEach((item) => {
        const index = this.findItemIndex(item);
        if (index >= 0) return;
        this.toggle(item);
      });
    }
  }

  globalIsIndeterminate() {
    return this.items.length > 0 && !this.globalIsChecked();
  }

  @computed
  get length() {
    return this.items.length;
  }

  toJSON() {
    return omit(this, ['listStore']);
  }
}
