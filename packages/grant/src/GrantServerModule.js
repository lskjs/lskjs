import GrantModule from './GrantModule';

export default class GrantServerModule extends GrantModule {
  async can(...args) {
    const value = await super.can(...args);
    if (value !== null) return value;
    const { action } = await this.getParams(args);
    this.log.trace(`!GrantServerModule.rules[${action}]`);
    return false;
  }
}
