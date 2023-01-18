const Rsync = require('rsync');

const { Err } = require('@lskjs/err');
const { getShortPath } = require('./getShortPath');
const { log } = require('./log');

const copy = ({ from, to, nodemodules = false, git = false, flags: initFlags = {} }) => {
  const flags = {
    a: true,
    E: true,
    z: true,
    v: true,
    progress: false,
    'delete-after': true,
    perms: true,
    ...initFlags,
  };

  const excludes = ['.DS_Store', !nodemodules ? 'node_modules' : null, !git ? 'git' : null].filter(Boolean);
  const from2 = `${from}/`; // TODO: надо сделать поумнее

  const rsync = new Rsync().flags(flags).source(from2).destination(to).exclude(excludes);

  log.debug('[copy]', '[starting]', getShortPath(from), '=>', getShortPath(to));
  log.trace('[copy]', '[run]', rsync.command());

  rsync.output(
    (data) => {
      const str = data.toString().trim();
      if (str.includes('total size is ')) {
        // log.debug(str)
        return;
      }
      if (str.startsWith('building file list')) return;
      if (str.startsWith('done')) return;
      log.trace('[copy]', '[progress]', data.toString().trim());
      // do things like parse progress
    },
    () => {
      // data
      // do things like parse error output
    },
  );
  return new Promise((resolve, reject) => {
    rsync.execute((err, code, cmd) => {
      if (err) {
        log.error({ code, err, cmd });

        return reject(new Err(err, { code, cmd }));
      }
      log.info('[copy]', getShortPath(from), '=>', getShortPath(to));
      return resolve();
    });
  });
};

module.exports = {
  copy,
};
