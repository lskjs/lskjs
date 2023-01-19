const { shell } = require('./shell');
const fs = require('fs');
const Err = require('@lskjs/err');

function rsync(from, to, { options = '-aEp', cwd, ignoreMissingFiles, cmd } = {}) {
  if (!cmd) {
    // eslint-disable-next-line no-param-reassign
    cmd = process.env.NODE_ENV === 'production' ? 'cp' : 'rsync';
  }
  // eslint-disable-next-line no-param-reassign
  if (!cwd) cwd = process.cwd();
  // const cwd = options.cwd || process.cwd();
  if (!to) throw '!to';
  let items = [];
  if (Array.isArray(from)) {
    items = from;
  } else if (typeof from === 'string') {
    items = from.trim().split(' ').filter(Boolean);
  }
  if (!items.length) throw '!from';
  if (ignoreMissingFiles) {
    items = items.filter((p) => fs.existsSync(p));
  }
  const paths = items.join(' ');
  if (!paths) return null;

  if (cmd === 'rsync') {
    return shell(`rsync ${options} ${paths} ${to}`);
  }
  if (cmd === 'cp') {
    return shell(`yes | cp -R ${paths} ${to}`);
  }
  throw new Err('incorrect cmd', { cmd });
}

module.exports = { rsync };
