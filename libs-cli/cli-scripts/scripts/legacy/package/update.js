#!/usr/bin/env node
const { run, hasCra, rootPath, packagePath, shell, rsync } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(
    // eslint-disable-next-line max-len
    'rm -rf bump.txt .babelrc .babelrc.js .eslintrc.js styleguide.config.js tsconfig.json tsconfig.types.json .storybook bump.txt .storybook',
  );

  const files = ['tsconfig.json', 'tsconfig.types.json', '.babelrc.js'].map(rootPath);
  await rsync(files, packagePath('.'));
  await shell(`lsk run update:merge`);
  if (hasCra()) {
    await shell(`lsk run update:cra`);
  }
  await shell(`lsk run npm:update`);
  await shell(`lsk run update:contributors`);
  await shell(`lsk run update:readme`);
};
run(main);
