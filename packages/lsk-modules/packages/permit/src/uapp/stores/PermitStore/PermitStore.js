import { observable } from 'mobx';
import CrudStore from '@lskjs/general/stores/CrudStore';
import PermitApi from './PermitApi';

export default uapp => class UserStore extends CrudStore {
  static api = new PermitApi({ uapp });

  @observable _id;
  @observable info = {};
  @observable private = {};

  update(params) {
    console.log('user.update', params);
    this.setState(params);
  }
  reset(params) {
    console.log('user.reset', params);
  }
  isActive() {
    return false;
  }
};
