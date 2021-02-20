import BaseBotPlugin from '@lskjs/bots-plugin';
import asyncMapValues from '@lskjs/utils/asyncMapValues';

import Api from './BotsNotifyApi';
import Providers from './providers';

export default class NotifyPlugin extends BaseBotPlugin {
  providers = ['telegram'];
  Api = Api;
  Providers = Providers;
  async init() {
    await super.init();
    this.providers = await asyncMapValues(this.Providers, (Provider) => Provider.create());
  }

  getToken(req) {
    return (
      req.get('X-Gitlab-Token') ||
      req.get('X-Access-Token') ||
      req.get('X-Auth-Token') ||
      req.get('token') ||
      req.data.secret
    );
  }
  getProvider(req) {
    const gitlabEvent = req.get('X-Gitlab-Event');
    const githubEvent = req.get('X-Github-Event');
    const isAlertManager = (req.get('User-Agent') || '').includes('Alertmanager');

    return (
      req.get('X-Gitlab-Token') ||
      req.get('X-Access-Token') ||
      req.get('X-Auth-Token') ||
      req.get('token') ||
      req.data.secret
    );
  }
}
