import utils from '../../utils';

const { ignoreMd } = utils;

const stringify = (data) => `\`\`\` ${JSON.stringify(data, null, 2)}\`\`\``;

export default function createMd(message = {}) {
  const { title, projectName, url, level } = message;
  let { data = '' } = message;
  let sign = '❗️';

  if (level === 'warn') sign = '⚠️';
  if (typeof data !== 'string') data = stringify(data);

  return `${sign} ${ignoreMd(projectName)}\n${ignoreMd(title)}\n${data || ''}\n${ignoreMd(url)}`;
}
