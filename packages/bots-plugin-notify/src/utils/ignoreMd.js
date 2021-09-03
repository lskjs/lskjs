export const ignoreMd = (text = '', provider = 'telegram') => {
  if (provider === 'telegram') return text.replaceAll(/[^A-Za-z0-9А-Яа-я ]/gi, (c) => `\\${c}`);
  return text;
};

export default ignoreMd;
