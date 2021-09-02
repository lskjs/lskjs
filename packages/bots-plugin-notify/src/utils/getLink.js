export default (text = '', link = '', provider = 'telegram') => {
  if (provider === 'telegram') return `[${text}](${link})`;
  if (provider === 'slack') return `<${link}|${text}>`;
  return `${text} <${link}>`;
};
