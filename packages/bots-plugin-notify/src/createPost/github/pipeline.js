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

  const status = statuses[objectAttributes.status] || `🤷‍♀️ ${objectAttributes.status}`;

  const message2 = commit.message ? bot.formatCode(commit.message) : '';

  const formatProjectName = bot.ignoreMd(project.name);
  const formatUsername = bot.ignoreMd(user.username);

  return `\
${status} ${formatProjectName}/${objectAttributes.ref}
@${formatUsername}
${message2}
${project.web_url}/pipelines/${objectAttributes.id}`;
}

export default pipeline;
