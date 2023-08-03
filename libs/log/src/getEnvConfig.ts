import { ObjectLike, omitNull } from '@lskjs/algos';
import { getEnvVar, isClient, isDev } from '@lskjs/env';

import { parseNs } from './utils/parseNs';

export const defaultFormat = isDev || isClient ? 'pretty' : 'lsk';

export const getEnvConfig = (): ObjectLike<string | RegExp[]> => {
  const debug = getEnvVar('DEBUG', '') || '';
  const isSilent = typeof process && process.argv?.includes('--silent');
  const isTrace = debug.startsWith('lsk') || debug.startsWith('*');
  const format = getEnvVar('LOG_FORMAT', getEnvVar('DEBUG_FORMAT', defaultFormat));
  const { on, off } = parseNs(debug);
  // eslint-disable-next-line no-nested-ternary
  const defaultLevel = isSilent ? 'error' : isTrace ? 'trace' : 'debug';
  const level = getEnvVar('LOG_LEVEL', getEnvVar('DEBUG_LEVEL', defaultLevel));
  const res = omitNull<string | null | RegExp[]>({
    format,
    level,
    on,
    off,
  }) as ObjectLike<string | RegExp[]>;
  return res;
};

export default getEnvConfig;
