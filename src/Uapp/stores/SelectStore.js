import { observable, toJS, action } from 'mobx';
import isPlainObject from 'lodash/isPlainObject';
import Store from './Store';

const getItemAndId = (...args) => {
  let id, item;
  if (isPlainObject(args[0])) {
    id = args[0]._id;
    item = args[0];
  } else {
    id = args[0];
    item = args[1];
  }
  return { id, item };
};
export default class SelectStore extends Store {
  // constructor(state = {}) {
  //   if (state) this.setState(state);
  // }

  @observable list = []; // Массив объектов
  @observable ids = []; // Массив ID
  @observable globalCheck = false;
  // Добавить item
  @action.bound
  select(...args) {
    const { item, id } = getItemAndId(...args);
    this.list.push(item);
    this.ids.push(id);
  }
  @action
  selectAll(ids, items) {
    ids.forEach((id, i) => {
      this.ids.push(id);
      this.list.push(items[i]);
    });
  }
  // Убрать item
  @action.bound
  unselect(...args) {
    const { id } = getItemAndId(...args);

    const i = this.getItemIndex(id);
    if (i < 0) return;
    this.list.splice(i, 1);
    this.ids.splice(i, 1);
  }
  // Убрать все items
  unselectAll() {
    this.list.clear();
    this.ids.clear();
  }

  @action
  toggle(item) {
    const isExist = this.isSelect(item._id);
    if (isExist) {
      this.unselect(item._id);
    } else {
      this.select(item._id, item);
    }
  }
  //  checked={pageStore.selectStore.ids.indexOf(item._id) !== -1}
  //  checked={selectStore.isSelect(item._id)}
  //  // onClick={this.toggle}
  //  onClick={() => selectStore.toggle(item._id, item)}
  // onClick={() => {
  //   const isExist = pageStore.selectStore.isSelect(item._id);
  //   if (isExist) {
  //     pageStore.selectStore.unselect(item._id);
  //   } else {
  //     pageStore.selectStore.select(item._id, item);
  //   }
  // }}

  // Проверить есть ли item в списке
  // @TODO: Andruxa, спросить у Андрея как лучше
  isSelect(...args) {
    const { id } = getItemAndId(...args);
    return this.ids.indexOf(id) !== -1;
  }
  // Взять все items
  getItems() {
    return this.list;
  }
  // Взять число элементов
  getCount() {
    return this.list.length;
  }
  getItemIndex(id) {
    return this.ids.indexOf(id);
  }
  getIds() {
    return toJS(this.ids);
  }
  toJS() {
    return toJS(this.list);
  }
}
