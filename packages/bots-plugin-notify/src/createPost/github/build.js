import utils from '../../utils';

const { ignoreMd, getCode } = utils;

const statuses = {
  success: '✅',
  pending: '🕔',
  failed: '❌',
  canceled: '🙅‍♂️',
  created: '🐣',
  running: '🏃💨',
};

export default function (message, provider) {
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
  const formatProjectName = getCode(ignoreMd(projectName, provider), provider);
  const formatBuildName = ignoreMd(buildName, provider);
  const formatUsername = ignoreMd(user.name, provider);

  return `\
  ${formatProjectName}
${status} *${formatBuildName}*
_${formatUsername}_
${repository.homepage}/-/jobs/${buildId}`;
}
