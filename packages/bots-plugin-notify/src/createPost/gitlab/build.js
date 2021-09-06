const statuses = {
  success: '✅',
  pending: '🕔',
  failed: '❌',
  canceled: '🙅‍♂️',
  created: '🐣',
  running: '🏃💨',
};

export function build(message, bot) {
  const {
    // commit,
    repository,
    // object_attributes: objectAttributes,
    user,
    build_name: buildName,
    project_name: projectName,
    build_status: buildStatus,
    build_id: buildId,
  } = message.meta;

  const status = statuses[buildStatus] || `🤷‍♀️ ${buildStatus}`;

  const formatProjectName = bot.formatCode(projectName);
  const formatUsername = bot.ignoreMd(user.name);

  return `\
  ${formatProjectName}
${status} *${buildName}*
_${formatUsername}_
${repository.homepage}/-/jobs/${buildId}`;
}

export default build;
