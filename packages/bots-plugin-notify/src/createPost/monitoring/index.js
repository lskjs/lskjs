import Err from '@lskjs/err';
// import { createMd } from './utils/createMd';
// import { getEconnabortedErrorMessage } from './utils/getEconnabortedErrorMessage';
// import { getOtherErrorMessage } from './utils/getOtherErrorMessage';
// import { getRedirectErrorMessage } from './utils/getRedirectErrorMessage';
// import { getWarningMessage } from './utils/getWarningMessage';

export const monitoring = ({ project, status, time, monitoring: monitoingConfig, res, err }) => {
  const arr = [
    ['status', status],
    ['err', err ? Err.getCode(err) : null],
    ['res', res ? res.status : null],
    ['time', time],
    ['project', project.name],
    ['url', monitoingConfig.url],
  ];

  return arr.map(([key, val]) => `${key}: ${val}`).join('\n');
};

export default monitoring;
