// eslint-disable-next-line import/no-cycle
import { createMd } from '.';

export function getEconnabortedErrorMessage({ projectName, url, timeout }, bot) {
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
