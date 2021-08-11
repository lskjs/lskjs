import utils from '../../utils';

const { ignoreMd } = utils;

const statuses = {
  success: '✅',
  pending: '🕔',
  failed: '❌',
  canceled: '🙅‍♂️',
  created: '🐣',
  running: '🏃💨',
};

export default function (message) {
  const { commit, project, object_attributes: objectAttributes, user } = message.meta;

  const status = statuses[objectAttributes.status] || `🤷‍♀️ ${objectAttributes.status}`;

  const message2 = commit.message ? `\`${commit.message}\`` : '';

  return `\
${status} ${ignoreMd(project.name)}/${objectAttributes.ref}
@${user.username}
${message2}
${project.web_url}/pipelines/${objectAttributes.id}`;
}
