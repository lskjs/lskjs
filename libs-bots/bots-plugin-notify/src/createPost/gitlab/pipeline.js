const statuses = {
  success: '✅',
  pending: '🕔',
  failed: '❌',
  canceled: '🙅‍♂️',
  created: '🐣',
  running: '🏃💨',
};

export function pipeline(message, bot) {
  const { commit, project, object_attributes: objectAttributes, user } = message.meta;
  const { isMd } = message.isMd;

  const status = statuses[objectAttributes.status] || `🤷‍♀️ ${objectAttributes.status}`;

  const formatedMessage = bot.formatCode(commit.message, isMd);
  const formatedUsername = bot.ignoreMd(user.username, isMd);
  const formatedProjectName = bot.ignoreMd(`${project.name}/${objectAttributes.ref}`, isMd);
  const formatedLink = bot.ignoreMd(`${project.web_url}/pipelines/${objectAttributes.id}`, isMd);

  return `\
${status} ${formatedProjectName}
@${formatedUsername}
${formatedMessage}
${formatedLink}`;
}

export default pipeline;
