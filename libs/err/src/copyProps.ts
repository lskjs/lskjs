import { IErr } from './types';

export const copyProps = (errTo: IErr, errFrom: any) => {
  if (typeof errFrom === 'string') return;
  Object.keys(errFrom).forEach((key: any) => {
    const val = errFrom[key];
    if (typeof val === 'function') return;
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    errTo[key] = val;
  });
};

export default copyProps;
