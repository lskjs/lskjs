import { spawn } from 'child_process';
import trim from '@lskjs/utils/trimSpaces';

function exec(command, args = [], options = {}) {
  const {
    trace = console.log, // eslint-disable-line no-console
    log = console.log, // eslint-disable-line no-console
    error = console.error, // eslint-disable-line no-console
    // cwd = process.cwd(),
  } = options;

  if (trace) trace('>>>', trim(command));
  return new Promise((resolve) => {
    const proc = spawn(command, args);
    proc.stdout.on('data', (data) => {
      const res = data.toString().trim();
      if (log) log(res);
    });
    proc.stderr.on('data', (data) => {
      const res = data.toString().trim();
      if (error) error(res);
    });
    resolve(proc);
  });
}

export default exec;
