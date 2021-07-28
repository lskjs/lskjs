import isPlainObject from 'lodash/isPlainObject';
import pick from 'lodash/pick';

export const errProps = (
  err: any,
  fields: string[] = ['name', 'message', 'stack', 'text'],
): Record<string, unknown> => {
  if (isPlainObject(err)) return err;
  if (err instanceof Error) {
    if ((err as any).__err) return pick(err, Object.getOwnPropertyNames(err));
    return pick(err, fields);
  }
  return {};
};

export default errProps;
