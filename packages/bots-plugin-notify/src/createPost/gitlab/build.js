const statuses = {
  success: '✅',
  pending: '🕔',
  failed: '❌',
  canceled: '🙅‍♂️',
  created: '🐣',
  running: '🏃💨',
};

export default function (message) {
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

  return `\
  \`${projectName}\`
${status} *${buildName}*
_${user.name}_
${repository.homepage}/-/jobs/${buildId}`;
}
