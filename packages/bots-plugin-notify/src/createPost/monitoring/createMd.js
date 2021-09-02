import utils from '../../utils';

const { ignoreMd, getCode } = utils;

// const stringify = (data) => `\`\`\` ${JSON.stringify(data, null, 2)}\`\`\``;
const stringify = (data, provider) => getCode(JSON.stringify(data, null, 2), provider);

export default function createMd(message = {}, provider) {
  const { title, projectName, url, level } = message;
  let { data = '' } = message;
  let sign = '❗️';

  if (level === 'warn') sign = '⚠️';
  if (typeof data !== 'string') data = stringify(data, provider);

  const formatProjectName = ignoreMd(projectName, provider);
  const formatTitle = ignoreMd(title, provider);
  const formatUrl = ignoreMd(url, provider);

  return `${sign} ${formatProjectName}\n${formatTitle}\n${data || ''}\n${formatUrl}`;
}
