/* eslint-disable global-require */
import Module from '@lskjs/module';
import Err from '@lskjs/err';
import isEmpty from 'lodash/isEmpty';

export class ActionChain extends Module {
  getAction(...args) {
    return this.actionModule.getAction(...args);
  }

  async nextAction({ actionParams, res, data, ...props }) {
    const { then: actionThen, else: actionElse, fault1, fault2 } = actionParams;
    const { messageDayAgo, message2DaysAgo } = props;

    if (actionThen && !isEmpty(actionThen) && res) {
      return this.runAction({ parent: data, ...actionThen });
    }
    if (actionElse && !isEmpty(actionElse) && !res) {
      return this.runAction({ parent: data, ...actionElse });
    }
    if (fault2 && !isEmpty(fault2) && !res && !messageDayAgo && !message2DaysAgo) {
      return this.runAction({ parent: data, ...fault2 });
    }
    if (fault1 && !isEmpty(fault1) && !res && !messageDayAgo) {
      return this.runAction({ parent: data, ...fault1 });
    }
    return null;
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
    if (!action) {
      this.log.error('!action', actionType);
      throw new Err('!action', { data: { action: actionType } });
    }
    this.log.trace('[action]', actionType);
    try {
      // this.log.debug({ actionParams });
      let res = await action.bind(this)(params);

      let data = {};
      if (res instanceof Object) {
        ({ data } = res);
        res = res.res;
      }
      await this.nextAction({ actionParams, res, data });
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
