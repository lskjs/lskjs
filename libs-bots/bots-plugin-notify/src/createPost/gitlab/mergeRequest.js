const statuses = {
  opened: '🎉',
  closed: '❌',
  merged: '🤝',
};

export function mergeRequest(message, bot) {
  const { user, object_attributes: objectAttributes } = message.meta;
  const { state, status, source_branch: sourceBranch, target_branch: targetBranch } = objectAttributes;

  const { isMd } = message;

  const _status = statuses[state] || `🤷‍♀️ ${status}`;

  const formatedTitle = `${bot.formatCode(objectAttributes.title, isMd)}\n`;
  const formatedUsername = bot.ignoreMd(user.username, isMd);
  const formatedSources = bot.ignoreMd(`${state} ${sourceBranch} -> ${targetBranch}`, isMd);
  const formatedLink = bot.formatLink(bot.ignoreMd(objectAttributes.url, isMd), objectAttributes.url, isMd);

  return `\
🍻 ${_status} ${formatedSources}
@${formatedUsername}
${formatedTitle}
${formatedLink}`;
}

export default mergeRequest;
