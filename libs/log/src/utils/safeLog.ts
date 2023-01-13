import { isClient, isDev } from '@lskjs/env';

import { env } from './env';

// const LOG_LEVEL = () => env('LOG_LEVEL', '');
const LOG_FORMAT = () => env('LOG_FORMAT', isDev || isClient ? 'pretty' : 'lsk');

export const safeLog = (ctx: any, level = 'error', ...args: any[]) => {
  if (ctx.log && ctx.log[level]) {
    ctx.log[level](...args);
  } else {
    const logFormat = LOG_FORMAT();
    if (logFormat === 'none') return;
    if (logFormat === 'lsk') {
      // eslint-disable-next-line no-console
      console.error(
        {
          level,
          name: ctx.name || ctx.constructor.name,
        },
        ...args,
      );
    } else {
      console.error(`[${level[0]}] <${ctx.name || ctx.constructor.name}>`, ...args); // eslint-disable-line no-console
    }
  }
};
export default safeLog;
