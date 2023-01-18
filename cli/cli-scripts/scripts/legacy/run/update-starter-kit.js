#!/usr/bin/env node
const { run, shell, rsync, findPath } = require('@lskjs/cli-utils');

const findExternal = (name) => findPath({ name, local: 0 });

const main = async () => {
  const files = [
    '.all-contributorsrc',
    '.czrc.js',
    '.eslintrc-package.js',
    '.lintstagedrc.js',
    '.huskyrc.json',
    '.release-it.js',
    '.remarkrc.js',
    'Dockerfile',
    'jsconfig.json',
    'styleguide.config.js',
    'coverage',
    '.lintstagedrc.json',
    '.czrc',
  ];
  await shell(
    // eslint-disable-next-line max-len
    `rm -rf ${files.join(' ')}`,
  );
  await rsync(`${findExternal('files')}/`, '.', { options: '-aEp --exclude CHANGELOG.md --exclude node_modules' });
  await rsync(`${findExternal('softFiles')}/`, '.', { options: '-aEp --ignore-existing' });
  // eslint-disable-next-line no-console
  //   console.log(`
  // ===========================================
  //         All OK, now you need to do:
  // npm install && npm run bootstrap && npm run update
  // ===========================================
  //   `);
};

run(main);
