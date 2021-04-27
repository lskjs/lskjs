/* eslint-disable global-require */
import Module from '@lskjs/module';
import Err from '@lskjs/utils/Err';

export class ActionChain extends Module {
  getAction(...args) {
    return this.actionModule.getAction(...args);
  }
  async runAction(actionParams = {}) {
    // , otherParams = {}
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
      // ...otherParams,
    };
    // action: actionType2,
    const { type: actionType1, action: actionType2, ...params } = actionParams;
    const actionType = actionType1 || actionType2;
    // this.log.debug({ actionType1, actionType2, actionType });
    const action = await this.getAction(actionType);
    // console.log({ actionType, action });
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

export default ActionChain;
