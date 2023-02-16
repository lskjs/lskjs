function getDataByCtx(ctx, text = false) {
  const result = [];
  const message = this.bot.getMessage(ctx);
  const messageType = this.bot.getMessageType(ctx);

  if (text && (message.text || message.caption)) {
    result.push({ type: 'text', text });
  }
  if (messageType === 'photo') {
    result.push({ type: messageType, ...message.photo[message.photo.length - 1] });
  } else {
    result.push({ type: messageType, ...message[messageType] });
  }
  return result;
}

export default async function messageSplit(params) {
  const { parent = {}, extra = [], ctx, caption } = params;
  this.ctx = this.ctx || ctx;

  const messageText = caption || this.bot.getMessageText(this.ctx);
  let data = [];

  if (!this.ctx.group) {
    data = getDataByCtx.call(this, this.ctx, messageText);
    return { res: true, data };
  }

  this.ctx.group.forEach((context, index) => {
    const text = !index ? messageText : false;
    const toData = getDataByCtx.call(this, context, text);
    data.push(...toData);
  });
  return { res: true, data };
}
