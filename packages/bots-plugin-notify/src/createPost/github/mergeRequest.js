import utils from '../../utils';

const { ignoreMd } = utils;

const statuses = {
  opened: '🎉',
  closed: '❌',
  merged: '🤝',
};

export default function (message) {
  const { user, object_attributes: objectAttributes } = message.meta;

  const status = statuses[objectAttributes.state] || `🤷‍♀️ ${objectAttributes.status}`;

  const message2 = objectAttributes.title ? `\`${objectAttributes.title}\`\n` : '';
  return `\
🍻 ${status} ${objectAttributes.state} ${objectAttributes.source_branch} -> ${objectAttributes.target_branch}
@${ignoreMd(user.username)}
${message2}
[${objectAttributes.url}](${objectAttributes.url})`;
}
