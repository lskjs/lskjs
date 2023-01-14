/* global window */
import { isClient, isServer, isTTY } from '@lskjs/env';

// @ts-ignore
const envs = isClient ? window : process.env;
const argv = isServer ? process.argv : [];

export const checkSupport = (): boolean =>
  !('NO_COLOR' in envs || argv.includes('--no-color')) && // disable colors when NO_COLOR is set or --no-color in nodejs args
  (isClient || // enable colors in browser
    'FORCE_COLOR' in envs || // enable colors when FORCE_COLOR is set
    argv.includes('--color') || // enable colors when --color in nodejs args
    (isTTY && process.env.TERM !== 'dumb') || // enable colors when TTY and TERM
    'CI' in envs); // enable colors when CI is set

export const isSupported = checkSupport();

export default isSupported;
