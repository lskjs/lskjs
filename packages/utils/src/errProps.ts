import pick from 'lodash/pick';
import isPlainObject from 'lodash/isPlainObject';

export const errProps = (err: any, fields: string[] = ['name', 'message', 'stack', 'text']): object => {
  if (isPlainObject(err)) return err;
  if (err instanceof Error) {
    if (err.__err) return pick(err, Object.getOwnPropertyNames(err));
    return pick(err, fields);
  }
  return {};
};

export default errProps;
