/* eslint-disable max-len */

export default async function messageTrim(params) {
  const { parent: data = {}, ctx, hashtags, links, regExp } = params;
  this.ctx = this.ctx || ctx;

  const regExpURL = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\n?/,
    'gi',
  );

  const regExpHashtag = new RegExp(/#\S*(\s|$)\n?/, 'gi');

  let messageText = data.text || ' ';
  if (this.bot.isMediaGroup(this.ctx)) messageText = data.media[0].caption;

  messageText = links ? messageText.replace(regExpURL, '') : messageText;
  messageText = hashtags ? messageText.replace(regExpHashtag, '') : messageText;

  if (regExp && regExp instanceof RegExp) {
    const reg = new RegExp(regExp, 'gi');
    messageText = messageText.replace(reg, '');
  }

  data.text = data.text ? messageText : '';
  data.caption = data.caption ? messageText : '';

  if (data.type === 'mediaGroup') {
    const { caption } = data.media[0];
    data.media[0].caption = caption ? messageText : '';
  }

  return { res: true, data };
}
