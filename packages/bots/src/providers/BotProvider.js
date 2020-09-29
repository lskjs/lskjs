import Module from '@lskjs/module';
import some from 'lodash/some';

export default class BotProvider extends Module {
  name = 'BotProvider';
  provider = null;
  plugins = [];
  eventTypes = [];
  async init() {
    await super.init();
    if (!this.provider) this.log.warn('!provider');
  }
  getBotId() {
    return null;
  }
  async initEventEmitter() {
    if (this.eventTypes && Array.isArray(this.eventTypes)) {
      this.eventTypes.forEach((type) => {
        this.client.on(type, (...args) => this.emit(type, ...args));
      });
    }
  }

  /**
   * getMessageText
   * @param {*} message
   */
  // eslint-disable-next-line no-unused-vars
  getMessageText(message) {
    throw 'getMessageText not implemented';
  }

  /**
   * isMessageContains
   * @param {*} message
   * @param {*} regExp
   */
  // eslint-disable-next-line no-unused-vars
  isMessageContains(message, regExp) {
    let text = this.getMessageText();
    if (!text) return false;
    text = text.toLowerCase();
    if (regExp instanceof RegExp) {
      return text.match(regExp) != null;
    }
    return text.includes(regExp);
  }

  isMessageStartsWith(message, regExp) {
    let text = this.getMessageText(message);
    if (!text) return false;
    text = text.toLowerCase();
    if (regExp instanceof RegExp) {
      return text.match(regExp) != null;
    }
    return text.startsWith(regExp);
  }

  /**
   * isMessageCommand
   * @param {*} message
   * @param {*} command
   */
  // eslint-disable-next-line no-unused-vars
  isMessageCommand(message, command) {
    throw `${this.name}.isMessageCommand not implemented`;
  }
  /**
   * reply
   * @param {*} who
   * @param {*} message
   */
  // eslint-disable-next-line no-unused-vars
  reply(who, message) {
    throw `${this.name}.reply not implemented`;
  }

  isMessageCommands(message, commands) {
    if (!Array.isArray(commands)) {
      // eslint-disable-next-line no-param-reassign
      commands = [commands];
    }
    return some(commands, (command) => this.isMessageCommand(message, command));
  }

  runPlugin(plugin) {
    this.plugins.push(plugin);
  }
}
