import { ObjectLike } from './types';

export const pick = <T>(object: ObjectLike<T>, fields: string[]) =>
  // console.log('[object]', object);
  // console.log('[fields]', fields);
  // console.log('[object.message]', object.message);
  // console.log('[object.code]', object.code);
  // console.log('[JSON object]', JSON.stringify(object));
  fields.reduce((acc, key) => {
    if (object[key] !== undefined) {
      acc[key] = object[key];
    }
    return acc;
  }, {} as ObjectLike<T>);

export default pick;
