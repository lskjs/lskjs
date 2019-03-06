import { observable } from 'mobx';
import CrudStore from '@lskjs/general/stores/CrudStore';
import PermitApi from './PermitApi';

export default uapp => class PermitStore extends CrudStore {
  static api = new PermitApi({ uapp });

  @observable _id;
  @observable activatedAt;
  @observable disabledAt;
  @observable info = {};
  @observable private = {};

  isActive() {
    return !this.activatedAt && !this.disabledAt;
  }
};
