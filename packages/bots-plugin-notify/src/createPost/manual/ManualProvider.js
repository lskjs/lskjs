export function manual(message) {
  if (this?.debug) this.log.trace('manual.message', message);

  const options = {};
  if (message.isMd) {
    options.parse_mode = 'MarkdownV2';
  }
  // const msg = `💬 \n\n${JSON.stringify(message)}`;
  const msg = message.md || message.text;

  return {
    msg,
    options,
  };
}

export default manual;
