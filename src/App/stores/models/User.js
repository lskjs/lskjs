import { observable, computed, toJS } from 'mobx';
import { set } from 'lodash';

const sample = {
  avatar: '/assets/no-avatar.png',
  fullName: 'Счастливый Пользователь',
};

export default ctx => (

  class UserModel {

    @observable _id;
    @observable role;
    @observable profile = {
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
    };

    constructor(user) {
      if (user) {
        this.setData(user);
      }
    }

    static async getById(_id) {
      const userData = await ctx.api.getUser({ _id });
      return new this(userData);
    }

    setData(user) {
      if (!user) return this.reset();
      for (const item in user) {
        set(this, item, user[item]);
      }
      return true;
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

);

