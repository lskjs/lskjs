#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const { run, findPath } = require('@lskjs/cli-utils');
const runTemplate = require('remark-template/run');
const getBaseFile = require('remark-template/getFile');

const getFile = (name, ...params) => {
  const path = findPath(name);
  if (!path) return '';
  const res = getBaseFile(path, ...params);
  return res;
};

const main = async () => {
  const dataPath = findPath('scripts/templates/data.js');
  const cwd = process.cwd();
  const pack = require(`${cwd}/package.json`);
  const peerDeps = Object.keys(pack.peerDependencies || {}).join(' ');
  const title = (pack.name || '').split('/').reverse()[0] || '';
  let data = {
    peerDeps,
    title,
    package: pack,
  };
  if (dataPath) {
    data = {
      ...data,
      ...require(dataPath),
    };
  }
  const bodyPath = findPath('scripts/templates/body.md', {
    dirs: 1,
    nodemodules: 0,
  });
  if (!bodyPath) {
    // await shell(`rm -rf README.md`);
    return;
  }
  if (!fs.existsSync('README.md')) {
    fs.writeFileSync('README.md', '# init');
  }
  await runTemplate({
    from: 'scripts/templates/index.md',
    to: 'README.md',
    getFile,
    data,
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error({ err });
  });
};

module.exports = run(main);
