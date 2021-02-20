import Module from '@lskjs/module';
import Bluebird from 'bluebird';

export default class BaseProvider extends Module {
  getMessage(message) {
    return message.md || message.text;
  }
  sendMessage(message, { projectConfig }) {
    if (!message) throw '!message';
    let msg = this.getMessage();

    if (projectConfig.isDefault && msg) {
      msg = `[default] /api/bots/notify/${projectConfig.name}\n\n${msg}`;
    }

    const options = {};
    if (message.md || ['github', 'gitlab', 'alertmanager'].includes(message.type)) {
      options.parse_mode = 'Markdown';
    }

    // console.log('sendMessage', { projectName, msg });

    if (projectConfig.telegram && msg) {
      return Bluebird.map(project.telegram, (chat) => this.bot.telegram.sendMessage(chat, msg, options));
    }
    return [];
  }
}
