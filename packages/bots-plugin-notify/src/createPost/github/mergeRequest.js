import utils from '../../utils';

const { ignoreMd, getCode, getLink } = utils;

const statuses = {
  opened: '🎉',
  closed: '❌',
  merged: '🤝',
};

export default function (message, provider) {
  const { user, object_attributes: objectAttributes } = message.meta;

  const status = statuses[objectAttributes.state] || `🤷‍♀️ ${objectAttributes.status}`;
  const message2 = objectAttributes.title ? `${getCode(objectAttributes.title, provider)}\n` : '';

  const formatUsername = ignoreMd(user.username, provider);

  return `\
🍻 ${status} ${objectAttributes.state} ${objectAttributes.source_branch} -> ${objectAttributes.target_branch}
@${formatUsername}
${message2}
${getLink(objectAttributes.url, objectAttributes.url, provider)}`;
}
