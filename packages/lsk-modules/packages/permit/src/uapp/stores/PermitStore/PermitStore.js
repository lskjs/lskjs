import { observable } from 'mobx';
import set from 'lodash/set';
import CrudStore from '@lskjs/general/stores/CrudStore';
// import CrudStore from '@lskjs/mobx/stores/CrudStore';
import PermitApi from './PermitApi';

export default uapp => class PermitStore extends CrudStore {
  static api = new PermitApi({ uapp });

  @observable _id;
  // @observable activatedAt;
  // @observable disabledAt;
  @observable info = {};
  @observable private = {};

  setStateField(item, value) {
    // console.log({item, value});
    
    if (item === 'activatedAt' || item === 'disabledAt') {
      set(this, item, new Date(value));
    } else {
      super.setStateField(item, value);
    }
  }

  isActive() {
    console.log(this.activatedAt);
    console.log(this.disabledAt);
    console.log(this.expiredAt);
    console.log(!this.activatedAt && !this.disabledAt);
    
    return !this.activatedAt && !this.disabledAt;
  }
};
