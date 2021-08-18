import BaseBotPlugin from '@lskjs/bots-plugin';
import Err from '@lskjs/err';
import axios from 'axios';
import Bluebird from 'bluebird';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import cron from 'node-cron';

import alertmanager from './createPost/alertmanager';
import github from './createPost/github';
import gitlab from './createPost/gitlab';
import graylog from './createPost/graylog';
import monitoring from './createPost/monitoring';

export default class NotifyPlugin extends BaseBotPlugin {
  providers = ['telegram', 'slack'];
  crons = [];
  alertmanager = alertmanager;
  github = github;
  gitlab = gitlab;
  graylog = graylog;
  monitoring = monitoring;

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
    if (message.type === 'gitlab') {
      msg = this.gitlab(message, project, provider);
    }
    if (message.type === 'github') {
      msg = this.github(message, project, provider);
    }
    if (message.type === 'alertmanager') {
      msg = this.graylog(message, project, provider);
    }
    if (message.type === 'graylog') {
      msg = this.graylog(message, project);
    }

    if (isDefault && msg) {
      msg = `/notify/${projectName}\n\n${msg}`;
    }

    const options = {};
    if (message.md || message.isMd) {
      options.parse_mode = 'MarkdownV2';
    }

    let chats = [];
    if (provider === 'telegram' && project.telegram) chats = project.telegram;
    if (provider === 'slack' && project.slack) chats = project.slack;

    return Bluebird.map(chats, (chat) => bot.sendMessage(chat, msg, options));
  }

  checkResourses(bot) {
    const {
      getEconnabortedErrorMessage,
      getOtherErrorMessage,
      getRedirectErrorMessage,
      getWarningMessage,
    } = this.monitoring;

    const { projects } = this.config;
    const timeout = 30 * 1000;
    const timeoutWarn = 7 * 1000;

    forEach(projects, (project, projectName) => {
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
            const message = getRedirectErrorMessage({ projectName, url }, bot.provider);
            await this.sendNotification({ bot, message });
            return {};
          }
          if (Date.now() - time >= timeoutWarn) {
            const message = getWarningMessage({ projectName, url, timeoutWarn }, bot.provider);
            await this.sendNotification({ bot, message });
            return { status: 200 };
          }
          this.log.debug('Resource monitoring - OK', url);
          return {};
        } catch (err) {
          const message =
            err && err.code === 'ECONNABORTED'
              ? getEconnabortedErrorMessage({ projectName, url, timeout }, bot.provider)
              : getOtherErrorMessage({ projectName, url, err }, bot.provider);

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
