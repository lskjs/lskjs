/* eslint-disable no-console */
import { getEnvConfig } from '../getEnvConfig';

const { format } = getEnvConfig();

export const safeLog = (ctx: any, level = 'error', ...args: any[]) => {
  if (ctx.log && ctx.log[level]) {
    ctx.log[level](...args);
  } else {
    if (format === 'none') return;
    if (format === 'lsk') {
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
