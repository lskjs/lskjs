import { getCode, getMessage, isError } from '@lskjs/err/utils';

import { toString } from './toString';

export const getErrCode = (args: any[]) => args.map((arg) => (isError(arg) ? getCode(arg) : null)).filter(Boolean)[0];

export const createMsg = (args: any[]) =>
  args
    .map((arg) => {
      if (isError(arg)) {
        return getMessage(arg);
      }
      return toString(arg);
    })
    .join(' ');

export default createMsg;
