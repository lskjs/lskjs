import BaseBotPlugin from '@lskjs/bots-plugin';
import Err from '@lskjs/err';
import Bluebird from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import Actions from './actions';
import { getActiveProjects, runCron } from './utils';

export class PrometheusPlugin extends BaseBotPlugin {
  providers = ['telegram', 'slack'];
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
    if (!act) throw new Err('!act');

    return act.call(this, { bot, data: alerts, params });
  }

  async onEvent({ bot, project }) {
    await this.getActiveProjects(project);
    if (isEmpty(this.activeProjects)) return null;

    return Bluebird.map(
      this.activeProjects,
      async (activeProject) => {
        let { action: actions } = activeProject;
        const { alerts } = activeProject;

        if (!Array.isArray(actions)) actions = [actions];

        return Bluebird.map(actions, async (action) => this.runAction({ bot, alerts, action }));
      },
      {
        concurrency: 10,
      },
    );
  }

  runBot(bot) {
    this.crons = this.runCron({ bot });
  }
}

export default PrometheusPlugin;
