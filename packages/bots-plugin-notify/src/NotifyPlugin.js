import BaseBotPlugin from '@lskjs/bots-plugin';
import Err from '@lskjs/err';
import axios from 'axios';
import Bluebird from 'bluebird';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import cron from 'node-cron';

import {
  alertmanager,
  getEconnabortedErrorMessage,
  getOtherErrorMessage,
  getRedirectErrorMessage,
  getWarningMessage,
  github,
  gitlab,
  graylog,
} from './createPost';

export class NotifyPlugin extends BaseBotPlugin {
  providers = ['telegram', 'slack'];
  crons = [];
  alertmanager = alertmanager;
  github = github;
  gitlab = gitlab;
  graylog = graylog;
  getEconnabortedErrorMessage = getEconnabortedErrorMessage;
  getOtherErrorMessage = getOtherErrorMessage;
  getRedirectErrorMessage = getRedirectErrorMessage;
  getWarningMessage = getWarningMessage;

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
    let msg = message.text;
    if (this?.debug) this.log.trace('NotifyPlugin.sendNotification.message', message);
    if (message.type === 'gitlab') {
      msg = this.gitlab(message, project, bot);
    }
    if (message.type === 'github') {
      msg = this.github(message, project, bot);
    }
    if (message.type === 'alertmanager') {
      msg = this.alertmanager(message, bot);
    }
    if (message.type === 'graylog') {
      msg = this.graylog(message);
    }

    if (isDefault && msg) {
      msg = `/notify/${projectName}\n\n${msg}`;
    }

    const options = {};
    if (message.md || message.isMd) {
      options.parse_mode = 'MarkdownV2';
    }

    const chats = project[provider] || [];

    return Bluebird.map(chats, (chat) => bot.sendMessage(chat, msg, options));
  }

  checkResourses(bot) {
    const { projects } = this.config;
    const timeout = 30 * 1000;
    const timeoutWarn = 7 * 1000;

    forEach(projects, (project, projectName) => {
      // eslint-disable-next-line no-shadow
      const { monitoring } = project;
      if (!monitoring) return;
      forEach(monitoring, async (resourse) => {
        const { url } = resourse;
        if (!url) return {};
        try {
          const time = new Date();
          const { status } = await axios({
            url,
            timeout,
          });
          if (status >= 300) {
            const message = this.getRedirectErrorMessage({ projectName, url }, bot);
            await this.sendNotification({ bot, message });
            return {};
          }
          if (Date.now() - time >= timeoutWarn) {
            const message = this.getWarningMessage({ projectName, url, timeoutWarn }, bot);
            await this.sendNotification({ bot, message });
            return { status: 200 };
          }
          this.log.debug('Resource monitoring - OK', url);
          return {};
        } catch (err) {
          const message =
            err && err.code === 'ECONNABORTED'
              ? this.getEconnabortedErrorMessage({ projectName, url, timeout }, bot)
              : this.getOtherErrorMessage({ projectName, url, err }, bot);

          const { status, statusText } = err.response;
          this.log.error(`Status: ${status || ''} ${statusText || ''}`);
          await this.sendNotification({ bot, message });
          return {};
        }
      });
    });
  }
  runMonitoring(bot) {
    let cronConfig = get(this.config, 'cron', '* * * * *');
    if (!Array.isArray(cronConfig)) cronConfig = [cronConfig];

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
