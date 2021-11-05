import BaseBotPlugin from '@lskjs/bots-plugin';
import Err from '@lskjs/err';
import axios from 'axios';
import Bluebird from 'bluebird';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import cron from 'node-cron';

import { alertmanager, github, gitlab, graylog, monitoring } from './createPost';

export class NotifyPlugin extends BaseBotPlugin {
  debug = 1;
  providers = ['telegram', 'slack'];
  crons = [];
  alertmanager = alertmanager;
  github = github;
  gitlab = gitlab;
  graylog = graylog;
  monitoring = monitoring;

  // getEconnabortedErrorMessage = getEconnabortedErrorMessage;
  // getOtherErrorMessage = getOtherErrorMessage;
  // getRedirectErrorMessage = getRedirectErrorMessage;
  // getWarningMessage = getWarningMessage;

  sendNotification({ bot, message }) {
    if (!message) throw new Err('!message');
    const { provider } = bot;
    const { projectName } = message;
    let project = this.config.projects[projectName];
    let isDefault = false;
    if (!project) {
      isDefault = true;
      project = this.config.projects._default;
    }
    let msg = get(message, 'text');
    if (this.debug) this.log.trace('NotifyPlugin.sendNotification.message', message);
    if (message.type === 'gitlab') {
      msg = this.gitlab(message, project, bot);
    } else if (message.type === 'github') {
      msg = this.github(message, project, bot);
    } else if (message.type === 'alertmanager') {
      msg = this.alertmanager(message, bot);
    } else if (message.type === 'graylog') {
      msg = this.graylog(message);
    } else if (message.type === 'monitoring') {
      msg = this.monitoring(message);
    } else {
      msg = '!type';
      this.log.warn('!type', { message });
    }

    if (isDefault && msg) {
      msg = `/notify/${projectName}\n\n${msg}`;
    }

    const options = {};
    if (message.md || message.isMd) {
      options.parse_mode = 'MarkdownV2';
    }

    const chats = project[provider] || [];

    if (!msg) throw new Err('!NotifyPlugin.sendNotification.msg');
    return Bluebird.map(chats.filter(Boolean), (chat) => { //eslint-disable-line
      return bot.sendMessage(chat, msg, options);
    });
  }

  checkResourses(bot) {
    const { projects } = this.config;
    const timeout = 30 * 1000;
    const timeoutWarn = 7 * 1000;
    forEach(projects, (project, projectName) => {
      // eslint-disable-next-line no-param-reassign
      project.name = projectName;
    });
    return Bluebird.map(Object.values(projects), async (project) => {
      const { monitoring: monitorings } = project;
      if (!(monitorings && monitorings.length > 0)) return null;
      return Bluebird.map(
        monitorings,
        // eslint-disable-next-line no-shadow
        async (monitoring) => {
          const message = {
            type: 'monitoring',
            projectName: project.name,
            project,
            monitoring,
            startedAt: Date.now(),
          };
          try {
            const { url } = monitoring;
            if (!url) return null;
            const res = await axios({ url, timeout });
            message.time = Date.now() - message.startedAt;
            message.res = res;
            if (res.status >= 300) {
              message.status = 'error';
            } else if (message.time >= timeoutWarn) {
              message.status = 'warning';
            } else {
              message.status = 'success';
            }
          } catch (err) {
            message.status = 'error';
            message.err = err;
            message.time = Date.now() - message.startedAt;
            message.response = err ? err.response : null;
          }
          this.log.trace(`[checkResourses] ${message.status}`);
          this.sendNotification({ bot, message }).catch((err) => {
            this.log.error('[sendNotification]', err, message);
          });
          return message;
        },
        { concurrency: 1 },
      );
    });
  }
  async runMonitoring(bot) {
    let cronConfig = get(this.config, 'cron', '* * * * *');
    if (!Array.isArray(cronConfig)) cronConfig = [cronConfig];

    await this.checkResourses(bot);

    this.crons = cronConfig.map((config) => {
      const { time = '* * * * *', timeZone = 'Europe/Moscow' } = config;
      return {
        time,
        timeZone,
        cron: cron.schedule(
          time,
          () => {
            this.checkResourses(bot);
          },
          { timeZone },
        ),
      };
    });
    this.log.info(`Cron: [${this.crons.map(({ time }) => time).join(',')}]. Provider: ${bot.provider}`);
  }
  async runBot(bot) {
    if (!this.config || isEmpty(this.config)) return;
    this.runMonitoring(bot);
  }
}

export default NotifyPlugin;
