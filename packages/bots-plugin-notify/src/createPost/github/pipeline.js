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
  const { isMd } = message;

  const status = statuses[objectAttributes.status] || `🤷‍♀️ ${objectAttributes.status}`;

  const formatedCommit = bot.formatCode(commit.message, isMd);

  const formatedProjectName = bot.ignoreMd(project.name, isMd);
  const formatedUsername = bot.ignoreMd(user.username, isMd);

  return `\
${status} ${formatedProjectName}/${objectAttributes.ref}
@${formatedUsername}
${formatedCommit}
${project.web_url}/pipelines/${objectAttributes.id}`;
}

export default pipeline;
