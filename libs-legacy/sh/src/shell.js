import { spawn } from './spawn';

export function shell(command, initOptions = {}) {
  const { args = [], ...options } = initOptions;
  return spawn(command, args, {
    shell: true,
    stdio: 'inherit',
    ...options,
  });
}

export default shell;
