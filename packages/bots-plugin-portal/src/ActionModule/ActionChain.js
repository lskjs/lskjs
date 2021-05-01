/* eslint-disable global-require */
import Module from '@lskjs/module';
import Err from '@lskjs/utils/Err';
import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';

export class ActionChain extends Module {
  getAction(...args) {
    return this.actionModule.getAction(...args);
  }

  async nextAction({ actionParams, res, ...props }) {
    const { then: actionThen, else: actionElse, fault1, fault2 } = actionParams;
    const { messageDayAgo, message2DaysAgo } = props;

    if (actionThen && !isEmpty(actionElse) && res) {
      return this.runAction(actionThen);
    }
    if (actionElse && !isEmpty(actionElse) && !res) {
      return this.runAction(actionElse);
    }
    if (fault2 && !isEmpty(fault2) && !res && !messageDayAgo && !message2DaysAgo) {
      return this.runAction(fault2);
    }
    if (fault1 && !isEmpty(fault1) && !res && !messageDayAgo) {
      return this.runAction(fault1);
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

      if (!Array.isArray(res)) res = [res];
      const data = await Bluebird.map(res, async (response) => {
        response.next = await this.nextAction({ actionParams, ...response });
        return response;
      });
      return {
        type: actionType,
        data,
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
