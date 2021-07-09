const stringify = (data) => `\`\`\` ${JSON.stringify(data, null, 2)}\`\`\``;

export default function createMd(message = {}) {
  const { title, projectName, url, level } = message;
  let { data = '' } = message;
  let sign = '❗️';

  if (level === 'warn') sign = '⚠️';
  if (typeof data !== 'string') data = stringify(data);

  return `${sign} ${projectName}\n${title}\n${data || ''}\n${url}`;
}
