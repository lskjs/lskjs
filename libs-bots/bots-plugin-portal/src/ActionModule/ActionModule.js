import models from '@lskjs/bots/models';
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
  async model(...args) {
    const modelsModule = await this.module('models');
    return modelsModule.model(...args);
  }
  async getModules() {
    return {
      ...super.getModules(),
      models: [() => import('@lskjs/db/models'), { models }],
    };
  }
  async runAction(actionParams = {}, ctxParams = {}) {
    const actionChain = await ActionChain.create({
      __parent: this,
      app: this.app,
      actionModule: this,
      ...ctxParams,
    });
    const res = await actionChain.runAction(actionParams);
    // this.log.debug({ res });
    return res;
  }
}

export default ActionModule;
