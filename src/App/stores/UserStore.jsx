import { extendObservable, observable, action, computed, toJS } from 'mobx';
import { set, clone } from 'lodash';

const defaultAvatar = 'https://ssl.gstatic.com/images/icons/material/product/1x/avatar_circle_blue_120dp.png';

export default class UserStore {

  @observable _id;
  @observable role;
  @observable profile = {
    avatar: defaultAvatar,
    firstName: undefined,
    lastName: undefined,
    middleName: undefined,
    city: undefined,
    bdate: undefined,
    sex: undefined,
    about: undefined,
    phone: undefined,
    email: undefined,
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
    this.store.log.info('[Y] ingoing user', user);
    if (!user) return this.reset();
    for (const item in user) {
      set(this, item, user[item]);
    }
    return true;
  }

  reset() {
    extendObservable(this, {
      _id: undefined,
      role: undefined,
      profile: {
        avatar: defaultAvatar,
        firstName: undefined,
        lastName: undefined,
        middleName: undefined,
        city: undefined,
        bdate: undefined,
        sex: undefined,
        about: undefined,
        phone: undefined,
        email: undefined,
      },
    });
  }

  @action
  async editUser(data) {
    this.store.ui.status('wait');
    const backup = clone(this.toJS);
    const res = await this.store.api.userEdit(data);
    this.update(res.data);
    this.store.ui.status(res.code);
    if (res.message !== 'ok') {
      this.update(backup);
    }
  }

  @action
  async editPassword(password) {
    this.store.ui.status('wait');
    const res = await this.store.api.userEdit({ password });
    this.store.ui.status(res.code);
    return res;
  }

  @computed get fullName() {
    return `${this.profile.firstName || 'Нет данных'} ${this.profile.lastName || ''}`;
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
