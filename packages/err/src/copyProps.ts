import isFunction from 'lodash/isFunction';

import { IErr } from './IErr.types';

export const copyProps = (errTo: IErr, errFrom: any) => {
  if (typeof errFrom === 'string') return;
  Object.keys(errFrom).forEach((key: any) => {
    const val = errFrom[key];
    if (isFunction(val)) return;
    // eslint-disable-next-line no-param-reassign
    errTo[key] = val;
  });
};

export default copyProps;
