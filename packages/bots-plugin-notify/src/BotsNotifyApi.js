import Api from '@lskjs/server-api';
import Bluebird from 'bluebird';

export default class BotsNotifyApi extends Api {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/:projectName': ::this.projectNotify,
    };
  }
  async projectNotify(req) {
    const { projectName } = req.params;
    let projectConfig = this.config.projects[projectName];
    if (!projectConfig) {
      this.log.warn('projectConfig is empty using default config');
      projectConfig = this.config.projects._default;
    }

    const token = this.plugin.getToken(req);
    if (projectConfig.secret && token !== projectConfig.secret) throw '!acl'; // x aceess token
    const provider = this.plugin.getProvider(req);

    return provider.onReq(req);
  }

  sendMessage(message) {
    if (!message) throw '!message'; // eslint-disable-linŽe
    const { project: projectName } = message;
    let project = this.config.projects[projectName];
    let isDefault = false;
    if (!project) {
      isDefault = true;
      project = this.config.projects._default;
    }

    let msg;
    if (message.type === 'gitlab') {
      msg = gitlab(message, project);
    } else if (message.type === 'github') {
      msg = github(message, project);
    } else if (message.type === 'alertmanager') {
      msg = alertmanager(message, project);
    } else {
      msg = message.md || message.text;
    }

    if (isDefault && msg) {
      msg = `/notify/${projectName}\n\n${msg}`;
    }

    const options = {};
    if (message.md || ['github', 'gitlab', 'alertmanager'].includes(message.type)) {
      options.parse_mode = 'Markdown';
    }

    // console.log('sendMessage', { projectName, msg });

    if (project.telegram && msg) {
      return Bluebird.map(project.telegram, (chat) => {
        return this.bot.telegram.sendMessage(chat, msg, options);
      });
    }
    return [];
  }
}
