import { spawn } from './spawn';

export function shell(command, args = [], options = {}) {
  return spawn(command, args, {
    shell: true,
    stdio: 'inherit',
    ...options,
  });
}

export default shell;
