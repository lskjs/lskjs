import BaseBotPlugin from '@lskjs/bots-plugin';
import axios from 'axios';
import Bluebird from 'bluebird';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import cron from 'node-cron';

import createPost from './createPost';

export default class NotifyPlugin extends BaseBotPlugin {
  providers = ['telegram'];
  crons = [];
  monitoring = createPost.monitoring;
  alertmanager = createPost.alertmanager;
  github = createPost.github;
  gitlab = createPost.gitlab;

  // getRoutes() {
  //   return [
  //     {
  //       path: '/notify',
  //       action: async ({ ctx, req, bot }) => this.checkResourses(bot),
  //     },
  //   ];
  // }

  sendNotification({ bot, message }) {
    if (!message) throw '!message';
    const { projectName } = message;
    let project = this.config.projects[projectName];
    let isDefault = false;
    if (!project) {
      isDefault = true;
      project = this.config.projects._default;
    }

    let msg = message.md || message.text;
    if (message.type === 'gitlab') {
      msg = this.gitlab(message, project);
    }
    if (message.type === 'github') {
      msg = this.github(message, project);
    }
    if (message.type === 'alertmanager') {
      msg = this.alertmanager(message, project);
    }

    if (isDefault && msg) {
      msg = `/notify/${projectName}\n\n${msg}`;
    }

    const options = {};
    if (message.md || ['github', 'gitlab', 'alertmanager'].includes(message.type)) {
      options.parse_mode = 'MarkdownV2';
    }

    if (project.telegram && msg) {
      return Bluebird.map(project.telegram, (chat) => bot.sendMessage(chat, msg, options));
    }
    return [];
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
            const message = getRedirectErrorMessage({ projectName, url });
            await this.sendNotification({ bot, message });
            return {};
          }
          if (Date.now() - time >= timeoutWarn) {
            const message = getWarningMessage({ projectName, url, timeoutWarn });
            await this.sendNotification({ bot, message });
            return { status: 200 };
          }
          this.log.debug('Resource monitoring - OK', url);
          return {};
        } catch (err) {
          const message =
            err && err.code === 'ECONNABORTED'
              ? getEconnabortedErrorMessage({ projectName, url, timeout })
              : getOtherErrorMessage({ projectName, url, err });

          const { status, statusText } = err.response;
          this.log.error(`Status: ${status || ''} ${statusText || ''}`);
          await this.sendNotification({ bot, message });
          return {};
        }
      });
    });
  }
  runMonitoring(bot) {
    let cronConfig = get(this.config, 'cron', []);
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
  }
  async runBot(bot) {
    if (!this.config || isEmpty(this.config)) return;
    this.runMonitoring(bot);
  }
}
