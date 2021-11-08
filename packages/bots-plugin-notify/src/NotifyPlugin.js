import BaseBotPlugin from '@lskjs/bots-plugin';
import Err from '@lskjs/err';
import axios from 'axios';
import Bluebird from 'bluebird';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import cron from 'node-cron';

import { alertmanager, github, gitlab, graylog, manual, monitoring } from './createPost';

export class NotifyPlugin extends BaseBotPlugin {
  debug = 1;
  providers = ['telegram', 'slack'];
  crons = [];
  alertmanager = alertmanager;
  github = github;
  gitlab = gitlab;
  graylog = graylog;
  monitoring = monitoring;
  manual = manual;

  // getEconnabortedErrorMessage = getEconnabortedErrorMessage;
  // getOtherErrorMessage = getOtherErrorMessage;
  // getRedirectErrorMessage = getRedirectErrorMessage;
  // getWarningMessage = getWarningMessage;

  async sendNotification({ bot, message }) {
    if (!message) throw new Err('!message');
    const { provider } = bot;
    const { projectName } = message;
    let project = this.config.projects[projectName];
    let isDefault = false;
    if (!project) {
      isDefault = true;
      project = this.config.projects._default;
    }
    if (this.debug) this.log.trace('NotifyPlugin.sendNotification.message', message);

    let res;
    if (message.type === 'gitlab') {
      res = await this.gitlab(message, project, bot);
    } else if (message.type === 'github') {
      res = await this.github(message, project, bot);
    } else if (message.type === 'alertmanager') {
      res = await this.alertmanager(message, bot);
    } else if (message.type === 'graylog') {
      res = await this.graylog(message);
    } else if (message.type === 'monitoring') {
      res = await this.monitoring(message);
    } else if (message.type === 'manual') {
      res = await this.manual(message);
    } else {
      res = { msg: `!type\n\n${JSON.stringify(message)}` };
      this.log.warn('!type', { message });
    }
    if (!res) return null;
    let { msg, options } = res;
    if (message.md || message.isMd) {
      if (!options) options = {};
      options.parse_mode = 'MarkdownV2';
    }

    if (isDefault && msg) {
      msg = `/notify/${projectName}\n\n${msg}`;
    }

    const chats = project[provider] || [];

    if (!msg) throw new Err('!NotifyPlugin.sendNotification.msg');
    return Bluebird.map(chats.filter(Boolean), (chat) => { //eslint-disable-line
      return bot.sendMessage(chat, msg, options).catch((err) => {
        if (
          err &&
          err.response &&
          err.response.error_code === 400 &&
          err.response.description &&
          err.response.description.startsWith("Bad Request: can't parse entities")
        ) {
          msg += `\n\n------P.S.-------\n${err.response.description}`;
          this.log.warn('[sendMessage]', err);
          return bot.sendMessage(chat, msg, {});
        }
        this.log.error('[sendMessage]', err);
        throw err;
      });
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
          await this.sendNotification({ bot, message }).catch((err) => {
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
