// import { observable, action } from 'mobx';

export default class User {
  constructor(data) {
    this.set(data);
  }
  set(data = {}) {
    Object.assign(this, data);
  }
  getProfileLink() {
    return `/user/${this._id}`;
  }

}
