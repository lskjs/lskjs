import { observable } from 'mobx';
import { set } from 'lodash';

export default ctx => (

  class MessageModel {

    @observable content;
    @observable attachments;
    @observable user;

    constructor(message) {
      if (message) {
        this.setData(message);
      }
    }

    setData(message) {
      for (const item in message) {
        if (item === 'user') {
          set(this, item, new ctx.models.User(message[item]));
        } else {
          set(this, item, message[item]);
        }
      }
    }

  }

);

