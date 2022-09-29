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

  const { isMd } = message;

  const status = statuses[buildStatus] || `🤷‍♀️ ${buildStatus}`;
  const formatedProjectName = bot.formatCode(bot.ignoreMd(projectName, isMd), isMd);
  const formatedBuildName = bot.formatBold(bot.ignoreMd(buildName, isMd), isMd);
  const formatedUsername = bot.formatItalics(bot.ignoreMd(user.name, isMd), isMd);

  return `\
  ${formatedProjectName}
${status} ${formatedBuildName}
${formatedUsername}
${repository.homepage}/-/jobs/${buildId}`;
}

export default build;
