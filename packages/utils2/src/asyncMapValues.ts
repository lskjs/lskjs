import Bluebird from 'bluebird';
import mapValues from 'lodash/mapValues';
// import { Dictionary, NumericDictionary, DictionaryIterator } from '@types/lodash';

// export default <T>(
//   obj: Dictionary<T> | NumericDictionary<T> | null | undefined,
//   callback: string | DictionaryIterator<T, any>,
// ): Promise<Dictionary<any>> => Bluebird.props(mapValues(obj, callback)); // @ts-ignore

export const asyncMapValues = (obj: any, callback: any): Promise<any> => Bluebird.props(mapValues(obj, callback));

export default asyncMapValues;
