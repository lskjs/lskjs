import { extendObservable, observable, action, computed, toJS } from 'mobx';
import { set, clone } from 'lodash';

const sample = {
  avatar: '/assets/no-avatar.png',
  fullName: 'Счастливый Пользователь',
};

export default class UserStore {

  constructor({ api, log }) {
    this.api = api;
    this.log = log;
    this.reset();
    // if (user) {
    //   this.update(user);
    //   // __CLIENT__ && store.auth.init(user);
    // }
  }

  @action
  update(user) {
    this.log.trace('UserStore.update', user);
    // this.store.log.info('incoming user', user);
    if (!user) return this.reset();
    for (const item in user) {
      set(this, item, user[item]);
    }
    return true;
  }

  @action
  reset() {
    this.log.trace('UserStore.reset');
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
    const backup = clone(this.toJS);
    const res = await this.api.userEdit(data);
    this.update(res.data);
    if (res.message !== 'ok') {
      this.update(backup);
    }
  }

  @action
  editPassword(password) {
    return this.api.userEdit({ password });
  }

  @computed get avatar() {
    // this.log.trace('get avatar', this.profile && this.profile.avatar );
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
