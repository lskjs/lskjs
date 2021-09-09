// eslint-disable-next-line import/no-cycle
import { createMd } from '.';

export function getRedirectErrorMessage(message, bot) {
  if (this?.debug) this.log.trace('getRedirectErrorMessage.message', message);

  const { projectName, url } = message;
  return {
    projectName,
    md: createMd(
      {
        level: 'error',
        projectName,
        url,
        title: 'status >= 300',
      },
      bot,
    ),
  };
}

export default getRedirectErrorMessage;
