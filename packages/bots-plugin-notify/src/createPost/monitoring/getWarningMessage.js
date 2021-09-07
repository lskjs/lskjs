// eslint-disable-next-line import/no-cycle
import { createMd } from '.';

export function getWarningMessage(message, bot) {
  if (this.debug) this.log.trace('getWarningMessage.message', message);

  const { projectName, url, timeoutWarn } = message;
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
