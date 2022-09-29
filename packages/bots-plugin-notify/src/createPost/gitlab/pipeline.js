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

  const formatMessage = bot.formatCode(commit.message, isMd);
  const formatProjectName = bot.ignoreMd(project.name, isMd);

  return `\
${status} ${formatProjectName}/${objectAttributes.ref}
@${user.username}
${formatMessage}
${project.web_url}/pipelines/${objectAttributes.id}`;
}

export default pipeline;
