import trim from '@lskjs/utils/trimSpaces';
import cp from 'child_process';

// {
// shell: true,
// stdio: 'inherit',
// }

export function exec(command, options = {}) {
  const {
    trace = console.log, // eslint-disable-line no-console
    log = console.log, // eslint-disable-line no-console
    error = console.error, // eslint-disable-line no-console
    ...otherOptions
    // cwd = process.cwd(),
  } = options;

  if (trace) trace('>>>', trim(command));
  return new Promise((resolve, reject) => {
    const proc = cp.exec(command, { ...otherOptions }, (err, stdout, stderr) => {
      if (err) {
        reject({ err, stdout, stderr }); // eslint-disable-line prefer-promise-reject-errors
        return;
      }
      resolve({ stdout, stderr });
    });
    if (proc.stdout) {
      proc.stdout.on('data', (data) => {
        if (log) log(data.trim());
      });
    }
    if (proc.stderr) {
      proc.stderr.on('data', (data) => {
        if (error) error(data.trim());
      });
    }
  });
}

export default exec;
