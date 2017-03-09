import { observable, action, computed, toJS } from 'mobx';
import { set, clone } from 'lodash';

export default class UserStore {

  @observable _id;
  @observable avatar = 'https://ssl.gstatic.com/images/icons/material/product/1x/avatar_circle_blue_120dp.png';
  @observable username;
  @observable name;
  @observable surname;
  @observable role;
  @observable middlename;
  @observable info = {
    phone: '',
    company: '',
  };

  constructor(store, user) {
    this.store = store;
    if (user) {
      this.update(user);
      if (__CLIENT__) this.init(user);
    }
  }

  async init(data) {
    const user = await this.store.api.getUser(data);
    this.update(user);
  }

  update(user) {
    if (!user) this.clearUser();
    for (const item in user) {
      set(this, item, user[item]);
    }
  }

  clearUser() {
    for (const item in this.toJS) {
      set(this, item, undefined);
    }
    this.avatar = 'https://ssl.gstatic.com/images/icons/material/product/1x/avatar_circle_blue_120dp.png';
  }

  @action
  async editUser(data) {
    this.store.ui.status('wait');
    const backup = clone(this.toJS);
    this.update(data);
    const res = await this.store.api.userEdit(data);
    this.store.ui.status(res.message);
    if (res.message !== 'ok') {
      this.update(backup);
    }
  }

  @computed get fullName() {
    return `${this.name} ${this.surname || ''}`;
  }

  @computed get toJS() {
    const self = toJS(this);
    delete self.store;
    return self;
  }

  @computed get profileLink() {
    return `/user/${this._id}`;
  }

}
