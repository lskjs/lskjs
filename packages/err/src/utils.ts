import omit from 'lodash/omit';
import pick from 'lodash/pick';
import uniq from 'lodash/uniq';

export const errUnknown = 'err_unknown';

export const getMessage = (err: any, def = errUnknown): string => {
  if (typeof err === 'string') return err;
  const errName = err && err.name !== 'Error' ? err.name : null;
  return (err && (err.message || err.text || err.code || errName)) || def;
};

export const getText = (err: any, def = errUnknown): string => {
  const array = [err.code, getMessage(err), err.text, err.stack];
  return (err && uniq(array.filter(Boolean)).join('\n')) || errUnknown;
};

export const getCode = (err: any, def = errUnknown): string => (err && (err.code || err.text || err.message)) || def;

export const getJSON = (err: any, onlySafeField = false): Record<string, unknown> => {
  if (typeof err === 'string') return { code: err, message: err };
  if (onlySafeField) return pick(err, ['name', 'code', 'message', 'text', 'data']);
  return omit(pick(err, Object.getOwnPropertyNames(err)), ['__err']);
};

export const isError = (err: any): boolean => err instanceof Error;
