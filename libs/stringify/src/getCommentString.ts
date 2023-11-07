export function getCommentString(str: string, { type = 'keyval' } = {}) {
  if (
    type === 'keyval' ||
    type === 'keyvalue' ||
    type === 'env' ||
    type === 'dotenv' ||
    type === 'yml' ||
    type === 'yaml'
  ) {
    return [
      '##',
      str
        .split('\n')
        .map((s) => ['##', s].filter(Boolean).join(' '))
        .join('\n'),
      '##',
    ].join('\n');
  }

  return [
    '/**',
    str
      .split('\n')
      .map((s) => [' *', s].filter(Boolean).join(' '))
      .join('\n'),
    ' */',
  ].join('\n');
}

export default getCommentString;
