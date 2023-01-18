const { spawn: nativeSpawn } = require('child_process');
const { joinArgs } = require('./joinArgs');
const { getPackageName } = require('./cwdInfo');
const { createLogger } = require('./log');

// https://github.com/shelljs/shelljs/issues/86
// https://docs.google.com/document/d/1UFm10TONaNWok3aEPzUP_OjZ6lEvwlYqyJBUcugLfso/edit#heading=h.u8gil4dopy47

function spawn(command, args = [], options = {}) {
  const {
    silence,
    cwd = process.cwd(),
    log: initLogger,
    ...otherOptions
  } = options;
  const log =
    initLogger ||
    createLogger({
      name: getPackageName({ cwd }),
    });
  if (!silence) log.debug(`[>>] ${command}`, joinArgs(args));

  return new Promise((resolve, reject) => {
    const proc = nativeSpawn(command, args, otherOptions);
    if (proc.stdout) {
      proc.stdout.on('data', (data) => {
        const res = data.toString().trim();
        if (!silence) log.log(res);
      });
    }
    if (proc.stderr) {
      proc.stderr.on('data', (data) => {
        const res = data.toString().trim();
        if (!silence) log.error(res);
      });
    }
    proc.on('error', (err) => {
      if (!silence) {
        if (err && err.code === 'ENOENT') {
          log.fatal(`NO SUCH DIRECTORY: ${cwd}`, err);
          return;
        }
        if (!silence) log.fatal('[ERRRR]', err);
      }
      reject(err);
    });
    proc.on('exit', (code) => {
      if (!code) {
        resolve(proc);
        return;
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ command, args, cwd, options, proc, code });
    });
  });
}

module.exports = {
  spawn,
};
