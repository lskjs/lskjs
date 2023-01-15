import { isPlainObject, pick } from '@lskjs/algos';

export const isLskError = (err: any) => err && err.__err;
export const getLskErrorProps = (err: any) =>
  pick(err, Object.getOwnPropertyNames(err));

export const errProps = (
  err: any,
  fields: string[] = ['name', 'message', 'stack', 'text']
): Record<string, unknown> => {
  if (isPlainObject(err)) return err;
  if (err instanceof Error) {
    if (isLskError(err)) return getLskErrorProps(err);
    // TODO: проверить что все норм работает
    // @ts-ignore
    return pick(err, fields);
  }
  return {};
};

export default errProps;
