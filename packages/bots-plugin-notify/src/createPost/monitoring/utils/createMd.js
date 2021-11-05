const stringify = (data, bot) => bot.formatCode(JSON.stringify(data, null, 2));

export function createMd(message = {}, bot) {
  const { title, projectName, url, level } = message;
  let { data = '' } = message;
  let sign = '❗️';

  if (level === 'warn') sign = '⚠️';
  if (typeof data !== 'string') data = stringify(data, bot);

  const formatProjectName = bot.ignoreMd(projectName);
  const formatTitle = bot.ignoreMd(title);
  const formatUrl = bot.ignoreMd(url);

  return `${sign} ${formatProjectName}\n${formatTitle}\n${data || ''}\n${formatUrl}`;
}

export default createMd;
