import Module from '@lskjs/module';

import { ActionChain } from './ActionChain';

export class ActionModule extends Module {
  actions = {};
  async init() {
    await super.init();
    this.log.debug('actions', Object.keys(this.actions));
  }
  getAction(name) {
    return this.actions[name];
  }
  async runAction(actionParams = {}, ctxParams = {}) {
    const actionChain = await ActionChain.create({
      actionModule: this,
      ...ctxParams,
    });
    console.log('actionChain', actionChain);
    return actionChain.runAction(actionParams);
  }
}

export default ActionModule;
