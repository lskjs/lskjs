const statuses = {
  opened: '🎉',
  closed: '❌',
  merged: '🤝',
};

export function mergeRequest(message, bot) {
  const { user, object_attributes: objectAttributes } = message.meta;

  const status = statuses[objectAttributes.state] || `🤷‍♀️ ${objectAttributes.status}`;

  const message2 = objectAttributes.title ? `${bot.formatCode(objectAttributes.title)}\n` : '';
  const formatUsername = bot.ignoreMd(user.username);

  return `\
🍻 ${status} ${objectAttributes.state} ${objectAttributes.source_branch} -> ${objectAttributes.target_branch}
@${formatUsername}
${message2}
${bot.formatLink(objectAttributes.url, objectAttributes.url)}`;
}

export default mergeRequest;
