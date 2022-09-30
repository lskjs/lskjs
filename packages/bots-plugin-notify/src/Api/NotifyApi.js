import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import Api from '@lskjs/server-api';
import Bluebird from 'bluebird';
import find from 'lodash/find';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';

import { getBool, getReqParams } from '../utils';
import { getAlertManagerMessage, getGithubMessage, getGitlabMessage, getGraylogMessage } from './helpers';

export class NotifyApi extends Api {
  messages = [];
  messageTimeout = 500;

  async getRoutes() {
    return {
      ...(await super.getRoutes()),
      '/': this.notify.bind(this),
      '/:projectName': this.notify.bind(this),
    };
  }
  async init() {
    await super.init();
    const { plugins, telegram, slack } = await this.app.module('bots');
    const { notify } = plugins;
    const { sendNotification, config } = notify;

    this.bot = {
      telegram,
      slack,
    };
    this.notifyConfig = config;
    this.sendNotification = sendNotification.bind(notify);
  }

  async sendError({ error, message }) {
    const errorMessage = JSON.stringify({
      message: message || `Не удалось собрать message! Смотри консоль`,
      date: new Date().toISOString(),
      error: {
        message: error?.response?.data?.message || error?.message,
        code: error?.response?.data?.code || error?.response?.error_code || error?.code,
        description: error?.response?.data?.description || error?.response?.description || error?.description,
      },
    });

    console.error('[sendError]', errorMessage, error);

    const errorChats = this.notifyConfig.projects?._error?.telegram;
    if (isEmpty(errorChats)) return;

    await Bluebird.each(errorChats, (errorChat) =>
      this.bot.telegram.sendMessage(errorChat, errorMessage).catch((err) => {
        console.error('[sendError.sendMessage]', err);
        throw err;
      }),
    );
  }

  async sendNotifications() {
    const date = Date.now() - this.messageTimeout;
    const { old = [], new2 = [] } = groupBy(this.messages, (m) => (m.createdAt < date ? 'old' : 'new2'));

    this.messages = new2;

    let sendTelegram = [];
    let sendSlack = [];
    if (this.bot.telegram) {
      sendTelegram = Bluebird.map(old, async (message) => this.sendNotification({ bot: this.bot.telegram, message }), {
        concurrency: 10,
      });
    }

    if (this.bot.slack) {
      sendSlack = Bluebird.map(old, async (message) => this.sendNotification({ bot: this.bot.slack, message }), {
        concurrency: 10,
      });
    }

    const res = await Promise.all([sendTelegram, sendSlack]);
    if (isDev) {
      return res;
    }
    return { status: 'success', code: 200 };
  }

  createMessage({ req, projectName }) {
    const { gitlabEvent, githubEvent, isAlertManager, isGraylog } = getReqParams(req);
    const project = this.notifyConfig.projects[projectName] || this.notifyConfig.projects._default;

    let message = {
      _id: Date.now() + Math.random(),
      createdAt: new Date(),
      type: 'manual',
      projectName,
      sended: false,
      showChannel: !!project.showChannel,
    };

    if (gitlabEvent) {
      message = getGitlabMessage(req, message);
    }
    if (githubEvent) {
      message = getGithubMessage(req, message);
    }
    if (isAlertManager) {
      message = getAlertManagerMessage(req, message);
    }
    if (isGraylog) {
      message = getGraylogMessage(req, message);
    }

    const { text, md } = get(req, 'data', {});
    if (text) message.text = text;

    if (md) {
      message.text = md;
      message.isMd = getBool(req.query.isMd, true);
    }

    if (message.messageHash) {
      const { messageHash } = message;
      const parentMessage = find(this.messages, { messageHash });
      if (parentMessage) {
        if (!parentMessage.branches) {
          parentMessage.branches = [];
        }
        parentMessage.branches.push(message.branch);

        return 'duplicate';
      }
    }
    return message;
  }

  async notify(req) {
    const projectName = get(req, 'data.projectName') || get(req, 'params.projectName') || '_default';
    const project = this.notifyConfig.projects[projectName] || this.notifyConfig.projects._default;

    const { token } = getReqParams(req);

    if (project.secret && token !== project.secret) throw new Err('!acl'); // x aceess token

    let message;
    try {
      message = this.createMessage({ req, projectName });

      this.messages.push(message);
      await Bluebird.delay(this.messageTimeout * 1.3);
      const res = await this.sendNotifications();
      return res;
    } catch (error) {
      await this.sendError({ error, message });
      return { status: 'error', code: 503 };
    }
  }
}

export default NotifyApi;
