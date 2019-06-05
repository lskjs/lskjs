import cp from 'child_process';
import trim from '@lskjs/utils/trimSpaces';

function exec(command, options = { }) {
  const {
    trace = console.log, // eslint-disable-line no-console
    log = console.log, // eslint-disable-line no-console
    error = console.error, // eslint-disable-line no-console
    // cwd = process.cwd(),
  } = options;

  if (trace) trace('>>>', trim(command));
  return new Promise((resolve, reject) => {
    const proc = cp.exec(command, { ...options }, (err, stdout, stderr) => {
      if (err) {
        reject({ err, stdout, stderr }); // eslint-disable-line prefer-promise-reject-errors
        return;
      }
      resolve({ stdout, stderr });
    });
    proc.stdout.on('data', (data) => {
      if (log) log(data.trim());
    });
    proc.stderr.on('data', (data) => {
      if (error) error(data.trim());
    });
  });
}

export default exec;
