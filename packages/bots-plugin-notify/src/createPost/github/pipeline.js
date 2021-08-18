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
  const { commit, project, object_attributes: objectAttributes, user } = message.meta;

  const status = statuses[objectAttributes.status] || `🤷‍♀️ ${objectAttributes.status}`;

  const message2 = commit.message ? getCode(commit.message, provider) : '';

  const formatProjectName = ignoreMd(project.name, provider);
  const formatUsername = ignoreMd(user.username, provider);

  return `\
${status} ${formatProjectName}/${objectAttributes.ref}
@${formatUsername}
${message2}
${project.web_url}/pipelines/${objectAttributes.id}`;
}
