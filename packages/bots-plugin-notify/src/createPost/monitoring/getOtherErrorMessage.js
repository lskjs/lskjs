// eslint-disable-next-line import/no-cycle
import { createMd } from '.';

export function getOtherErrorMessage({ projectName, url, err }, bot) {
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
