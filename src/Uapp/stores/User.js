import { extendObservable, action, computed, toJS, observable } from 'mobx';
import { set, clone } from 'lodash';

const sample = {
  avatar: '/assets/no-avatar.png',
  fullName: 'Счастливый Пользователь',
};

export default ctx => class UserModel {
  @observable _id;
  @observable role;
  @observable profile = {};

  constructor(state = {}) {
    if (state) this.setState(state);
  }

  setState(state = {}) {
    for (const item in state) {
      set(this, item, state[item]);
    }
  }
  toJS() {
    return toJS(this);
  }

  reset() {
    console.log('this.reset');
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

  @computed get profileLink() {
    return `/user/${this._id}`;
  }
// }
//
//
//
// export default ctx => class UserStore {
  // @observable _id;
  // @observable role;
  // @observable profile = {
  //   avatar: undefined,
  //   firstName: undefined,
  //   lastName: undefined,
  //   middleName: undefined,
  //   city: undefined,
  //   bdate: undefined,
  //   sex: undefined,
  //   about: undefined,
  //   phone: undefined,
  //   email: undefined,
  // };
  // constructor({ api, log }) {
  //   ctx.api = api;
  //   this.log = log;
  //   this.reset();
  // }
  //
  //

  @action
  update(user) {
    // this.log.trace('UserStore.update', user);
    if (!user) return this.reset();
    for (const item in user) {
      set(this, item, user[item]);
    }
    return true;
  }

  // @action
  // reset() {
  //   // this.log.trace('UserStore.reset');
  //   extendObservable(this, {
  //     _id: undefined,
  //     role: undefined,
  //     profile: {
  //       avatar: undefined,
  //       firstName: undefined,
  //       lastName: undefined,
  //       middleName: undefined,
  //       city: undefined,
  //       bdate: undefined,
  //       sex: undefined,
  //       about: undefined,
  //       phone: undefined,
  //       email: undefined,
  //     },
  //   });
  // }

  @action
  async editUser(data) {
    const backup = clone(this.toJS);
    const res = await ctx.api.userEdit(data);
    this.update(res.data);
    if (res.message !== 'ok') {
      this.update(backup);
    }
  }

  @action
  editPassword(password) {
    return ctx.api.userEdit({ password });
  }

  static async getById(_id) {
    const userData = await ctx.api.getUser({ _id });
    return new this(userData);
  }

};
