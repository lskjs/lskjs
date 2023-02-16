// eslint-disable-next-line import/no-cycle
import { createMd } from '.';

export function getOtherErrorMessage(message, bot) {
  if (this?.debug) this.log.trace('getOtherErrorMessage.message', message);

  const { projectName, url, err } = message;
  return {
    projectName,
    text: createMd(
      {
        level: 'error',
        projectName,
        url,
        title: String(err),
      },
      bot,
    ),
    isMd: true,
  };
}

export default getOtherErrorMessage;
