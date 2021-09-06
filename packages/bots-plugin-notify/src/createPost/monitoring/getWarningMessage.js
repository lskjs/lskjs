// eslint-disable-next-line import/no-cycle
import { createMd } from '.';

export function getWarningMessage({ projectName, url, timeoutWarn }, bot) {
  return {
    projectName,
    md: createMd(
      {
        level: 'warn',
        projectName,
        url,
        title: `TIMEOUT ${timeoutWarn}`,
      },
      bot,
    ),
  };
}

export default getWarningMessage;
