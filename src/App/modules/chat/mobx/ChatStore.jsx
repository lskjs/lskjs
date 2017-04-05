import { observable } from 'mobx';
import MessageModel from './MessageModel';


export default class ChatStore {

  @observable messages = [];

  constructor(obj) {
    this.api = obj.api;
  }

  static async getMessages(subjectType, subjectId) {
    const { data } = await this.api.fetch(`/api/module/message/${subjectType}/${subjectId}`);
    return data.map(obj => new MessageModel(obj));
  }

  async fetchMessages(subjectType, subjectId) {
    const messages = await this.constructor.getMessages(subjectType, subjectId);
    this.messages = messages;
  }

}

