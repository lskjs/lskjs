function parseMessage(message) {
  const result = [];
  const messageType = this.bot.getMessageType(message);

  if (message.text) result.push({ type: 'text', text: message.text });
  if (message.caption) result.push({ type: 'text', text: message.caption });

  if (messageType === 'photo') {
    result.push({ type: messageType, ...message.photo[message.photo.length - 1] });
  } else {
    result.push({ type: messageType, ...message[messageType] });
  }
  return result;
}

export default async function messageSplit(params) {
  const { parent = {}, extra = [], ctx } = params;
  this.ctx = this.ctx || ctx;
  const data = [];

  if (!this.ctx.group) {
    const msg = this.bot.getMessage(this.ctx);
    const result = parseMessage.call(this, msg);
    data.push(...result);
  } else {
    this.ctx.group.forEach((context) => {
      const msg = this.bot.getMessage(context);
      const result = parseMessage.call(this, msg);
      data.push(...result);
    });
  }
  return { res: true, data };
}
