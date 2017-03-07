import { observable, action, computed, toJS } from 'mobx';
import set from 'lodash/set';

export default class UserStore {

  @observable avatar = 'https://ssl.gstatic.com/images/icons/material/product/1x/avatar_circle_blue_120dp.png';
  @observable username;
  @observable name;
  @observable surname;
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
    for (const item in user) {
      set(this, item, user[item]);
    }
  }

  @action
  editField(field = null, text) {
    if (field) set(this, field, text);
  }

  @action
  editUser() {
    this.store.api.userEdit(this.toJS);
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
