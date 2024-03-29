import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import unionBy from 'lodash/unionBy';
import { action, observable } from 'mobx';

import { Store } from './Store';

// TODO: переписать на не MOBX
export class SelectStore extends Store {
  idKey = '_id';
  @observable.shallow items = []; // Массив объектов

  // NOTE: увы, мы вынуждены повторять этот конструктор, из-за цепочки наследования Babel
  constructor(state = {}) {
    super();
    if (state) this.setState(state);
  }

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

  toJSON() {
    return omit(this, ['listStore']);
  }
}

export default SelectStore;
