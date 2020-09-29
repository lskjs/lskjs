import Plugin from './Plugin';

export default class ExamplePlugin extends Plugin {
  name = 'ExamplePlugin';
  providers = ['telegram', 'discord'];

  async run() {
    await super.run();
  }

  async runBot(bot, name) {
    const types = ['message', 'guildMemberAdd'];
    types.forEach((type) => {
      bot.on(type, (ctx) => {
        console.log(`${name}[${bot.provider}] <${type}> `, ctx.message);
      });
    });
  }
}
