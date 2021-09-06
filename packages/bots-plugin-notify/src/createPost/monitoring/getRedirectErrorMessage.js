// eslint-disable-next-line import/no-cycle
import { createMd } from '.';

export function getRedirectErrorMessage({ projectName, url }, bot) {
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
