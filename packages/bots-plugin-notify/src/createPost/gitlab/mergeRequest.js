const statuses = {
  opened: '🎉',
  closed: '❌',
  merged: '🤝',
};

export function mergeRequest(message, bot) {
  const { user, object_attributes: objectAttributes } = message.meta;
  const { title } = objectAttributes;

  const { isMd } = message;

  const status = statuses[objectAttributes.state] || `🤷‍♀️ ${objectAttributes.status}`;

  const formatedMessage = bot.formatCode(title, isMd);
  const formatedTitle = title ? `${formatedMessage}\n` : '';

  const formatedUsername = bot.ignoreMd(user.username, isMd);
  const formatedLink = bot.formatLink(objectAttributes.url, objectAttributes.url, isMd);

  return `\
🍻 ${status} ${objectAttributes.state} ${objectAttributes.source_branch} -> ${objectAttributes.target_branch}
@${formatedUsername}
${formatedTitle}
${formatedLink}`;
}

export default mergeRequest;
