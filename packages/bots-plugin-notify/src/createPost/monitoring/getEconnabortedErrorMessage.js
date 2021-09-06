// eslint-disable-next-line import/no-cycle
import { createMd } from '.';

export function getEconnabortedErrorMessage(message, bot) {
  if (this.debug) this.log.trace('getEconnabortedErrorMessage.message', message);

  const { projectName, url, timeout } = message;
  return {
    projectName,
    md: createMd(
      {
        level: 'error',
        projectName,
        url,
        title: `TIMEOUT ${timeout}`,
      },
      bot,
    ),
  };
}

export default getEconnabortedErrorMessage;
