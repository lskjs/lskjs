/* eslint-disable max-len */
import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import Api from '@lskjs/server-api';
import Bluebird from 'bluebird';
import crypto from 'crypto-js';
import find from 'lodash/find';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

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
      if (isDev) return res;
      return { data: 'ok' };
    } catch (err) {
      console.log({ err });
      throw new Err(err);
    }
  }

  async notify(req) {
    const projectName = get(req, 'data.projectName') || get(req, 'params.projectName') || '_default';

    let project = this.notifyConfig.projects[projectName];
    if (!project) project = this.notifyConfig.projects._default;

    const token =
      req.get('X-Gitlab-Token') ||
      req.get('X-Access-Token') ||
      req.get('X-Auth-Token') ||
      req.get('token') ||
      req.query?.secret ||
      req.data?.secret;

    const gitlabEvent = req.get('X-Gitlab-Event');
    const githubEvent = req.get('X-Github-Event');
    const isAlertManager = (req.get('User-Agent') || '').includes('Alertmanager');
    const isGraylog = req.body && req.body.event_definition_id && req.body.job_trigger_id && req.body.job_definition_id;

    if (project.secret && token !== project.secret) throw new Err('!acl'); // x aceess token

    // Message.create()
    const message = {
      _id: Date.now() + Math.random(),
      createdAt: new Date(),
      type: 'manual',
      projectName,
      sended: false,
      showChannel: !!project.showChannel,
    };
    const getBool = (param, def) => (param == null ? def : +param);

    if (gitlabEvent) {
      message.event = gitlabEvent;
      message.type = 'gitlab';
      message.meta = req.body;
      message.isMd = getBool(req.query.isMd, false);
      const { object_kind: objectKind, ref, commits = [] } = message.meta;
      if (objectKind === 'push') {
        message.branch = ref.slice(ref.lastIndexOf('/') + 1);
        message.messageHash = crypto.MD5([commits.map((c) => c.id)].join('')).toString();
      }
    }
    if (githubEvent) {
      message.event = githubEvent;
      message.type = 'github';
      message.meta = req.body;
      message.isMd = getBool(req.query.isMd, false);
      message.isMd = true;
      const { ref, commits = [] } = message.meta;
      if (githubEvent === 'push') {
        message.branch = ref.slice(ref.lastIndexOf('/') + 1);
        message.messageHash = crypto.MD5([commits.map((c) => c.id)].join('')).toString();
      }
    }
    if (isAlertManager) {
      message.event = 'alert';
      message.type = 'alertmanager';
      message.meta = req.body;
      message.isMd = getBool(req.query.isMd, false);
    }
    if (isGraylog) {
      message.event = 'alert';
      message.type = 'graylog';
      message.meta = req.body;
      message.isMd = getBool(req.query.isMd, false);
    }

    const { text, md } = get(req, 'data', {});
    if (text) {
      message.text = text;
    }

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

    this.messages.push(message);
    await Bluebird.delay(this.messageTimeout * 1.3);
    return this.sendNotifications();
  }
}

export default NotifyApi;
