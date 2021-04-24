/* eslint-disable global-require */
import Module from '@lskjs/module';
import Err from '@lskjs/utils/Err';
import Bluebird from 'bluebird';
import random from 'lodash/random';

// import actions from './actions';

export default class ActionModule extends Module {
  actions = {};
  async init() {
    await super.init();
  }
  // ...,
  async runAction(actionParams = {}, otherParams = {}) {
    if (Array.isArray(actionParams)) {
      // eslint-disable-next-line no-param-reassign
      actionParams = {
        type: 'each',
        items: actionParams,
      };
    }
    // eslint-disable-next-line no-param-reassign
    actionParams = {
      ...actionParams,
      ...otherParams,
    };
    const { type: actionType, ...params } = actionParams;
    const action = this.actions[actionType];
    if (!action) {
      this.log.error('!action', actionType);
      throw new Err('!action', { data: { action: actionType } });
    }
    this.log.trace('[action]', actionType);
    try {
      let res = await action.bind(this)(params);
      if (typeof res === 'string') res = { res };
      return {
        type: actionType,
        ...res,
      };
    } catch (err) {
      this.log.error('[action] ', actionType, err);
      return {
        type: actionType,
        errCode: Err.getCode(err),
      };
    }
    // this.log.debug('runAction', action, params);
  }
}
