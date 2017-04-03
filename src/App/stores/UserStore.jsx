import { extendObservable, observable, action, computed, toJS } from 'mobx';
import { set, clone } from 'lodash';

const sample = {
  avatar: '/assets/no-avatar.png',
  fullName: 'Счастливый Пользователь',
};

export default class UserStore {

  constructor(store, user) {
    this.store = store;
    this.reset();
    if (user) {
      this.update(user);
      store.auth.init(user);
    }
  }

  update(user) {
    // this.store.log.info('incoming user', user);
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
        avatar: undefined,
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

  @computed get avatar() {
    // console.log('get avatar', this.profile && this.profile.avatar );
    return this.profile && this.profile.avatar || sample.avatar;
  }

  @computed get fullName() {
    let fullname;
    if (this.profile.middleName) {
      fullname = [this.profile.lastName, this.profile.firstName, this.profile.middleName];
    } else {
      fullname = [this.profile.firstName, this.profile.lastName];
    }
    return fullname.filter(a => a).join(' ') || sample.fullName;
  }

  @computed get firstName() {
    return this.profile.firstName || (this.fullName || '').split(' ')[0];
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
