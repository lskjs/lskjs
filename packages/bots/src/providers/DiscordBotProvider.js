import Discord from 'discord.js';

export default class DiscordBotProvider {
  name = 'DiscordBotProvider';
  Discord = Discord;
  async init() {
    await super.init();
    if (!this.config.token) throw '!config.token';
    this.client = new Discord.Client();
    await this.client.login(this.config.token);
  }
  async run() {
    // this.client.on('message', async (message) => {
    //   message.channel.send(`Привет, ${member.user.username}`);
    //   commands.info(message, this.Api, this.config);
    // });
    // this.bot.on('ready', async () => {
    //   console.log(`Logged in as ${this.bot.user.tag}!`);
    // });
    // this.bot.on('guildMemberAdd', (member) => {
    //   member.send(`Привет, ${member.user.username}`);
    // });
    // this.bot.on('message', async (message) => {
    //   message.channel.send(`Привет, ${member.user.username}`);
    //   commands.info(message, this.Api, this.config);
    // });
  }
}
