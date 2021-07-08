// import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import Actions from './actions';
import { getActiveProjects, runCron } from './utils';

export default class PrometheusPlugin extends BaseBotPlugin {
  providers = 'telegram';
  getActiveProjects = getActiveProjects.bind(this);
  runCron = runCron.bind(this);

  activeProjects = [];

  async init() {
    await super.init();
    this.projects = this.config.projects;
  }

  async runAction({ bot, alerts, action }) {
    const { type, ...params } = action;
    const act = Actions[type];
    if (!act) throw '!act';

    this.bot = bot;
    return act.call(this, { data: alerts, params });
  }

  async onEvent({ bot }) {
    const activeProjects = await this.getActiveProjects();
    if (isEmpty(activeProjects)) return null;

    return Bluebird.map(this.activeProjects, async (project) => {
      let { action: actions } = project;
      const { alerts } = project;

      if (!Array.isArray(actions)) actions = [actions];

      return Bluebird.map(actions, async (action) => {
        await this.runAction({ bot, alerts, action });
      });
    });
  }

  runBot(bot) {
    this.crons = this.runCron({ bot });
  }
}
