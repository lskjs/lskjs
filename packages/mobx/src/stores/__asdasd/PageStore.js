import {
  observable,
  action,
} from 'mobx';
import Store from './Store';


export default class PageStore extends Store {
  @observable isOpenFooter = false;
  @observable isOpenRightSidebar = false;

  // RightSidebar
  @action
  toggleFooter() {
    this.isOpenFooter = !this.isOpenFooter;
  }
  @action
  toggleRightSidebar() {
    this.isOpenRightSidebar = !this.isOpenRightSidebar;
  }
}
