/* eslint-disable max-len */

export default async function messageTrim(params) {
  const { hashtags, links, regExp } = params;

  const regExpURL = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\n?/,
    'gi',
  );

  const regExpHashtag = new RegExp(/#\S*(\s|$)\n?/, 'gi');

  let messageText = this.bot.getMessageText(this.ctx);

  messageText = links && messageText.replace(regExpURL, '');
  messageText = hashtags && messageText.replace(regExpHashtag, '');

  if (regExp && regExp instanceof RegExp) {
    const reg = new RegExp(regExp, 'gi');
    messageText = messageText.replace(reg, '');
  }

  this.ctx = this.bot.setMessageText(this.ctx, messageText);
  return { res: true };
}
