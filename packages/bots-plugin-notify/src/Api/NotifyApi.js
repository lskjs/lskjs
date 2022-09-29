import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import Api from '@lskjs/server-api';
import Bluebird from 'bluebird';
import find from 'lodash/find';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

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

    try {
      const res = await Promise.all([sendTelegram, sendSlack]);
      if (isDev) {
        return res;
      }
      return { data: 'ok' };
    } catch (err) {
      console.log({ err });
      throw new Err(err);
    }
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

    const message = this.createMessage({ req, projectName });

    this.messages.push(message);
    await Bluebird.delay(this.messageTimeout * 1.3);
    return this.sendNotifications();
  }
}

export default NotifyApi;
