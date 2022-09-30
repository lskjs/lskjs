const statuses = {
  opened: '🎉',
  closed: '❌',
  merged: '🤝',
};

export function mergeRequest(message, bot) {
  const { user, object_attributes: objectAttributes } = message.meta;

  const { isMd } = message;

  const status = statuses[objectAttributes.state] || `🤷‍♀️ ${objectAttributes.status}`;

  const formatedTitle = `${bot.formatCode(objectAttributes.title, isMd)}\n`;
  const formatedUsername = bot.ignoreMd(user.username, isMd);
  const formatedLink = bot.formatLink(bot.ignoreMd(objectAttributes.url, isMd), objectAttributes.url, isMd);

  return `\
🍻 ${status} ${objectAttributes.state} ${objectAttributes.source_branch} -> ${objectAttributes.target_branch}
@${formatedUsername}
${formatedTitle}
${formatedLink}`;
}

export default mergeRequest;
