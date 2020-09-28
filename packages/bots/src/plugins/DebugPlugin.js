import sample from 'lodash/sample';
import Plugin from './Plugin';

export default class DebugPlugin extends Plugin {
  name = 'DebugPlugin';
  test(message) {
    this.reply
    return this.testMessageRegExp(message, /^\/chatid/i);
  }

  async doAction(message) {
    this.sendMessage(message, `user: ${message.from && message.from.id}\nchaitid: ${message.chat && message.chat.id}`);
  }
}
