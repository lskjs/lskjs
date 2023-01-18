#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ ctx, args, isRoot } = {}) => {
  // await shell('lsk run clean');
  await shell('lsk run build --prod --silent', { ctx, args });
  await shell('lsk run test --prod --silent', { ctx, args });
  if (isRoot) {
    await shell('lsk run prepare --dir .release', { ctx, args });
    let cmd = 'lerna publish --no-push --contents .release';
    const isYes = args.includes('--yes');
    if (isYes) {
      cmd += ' --yes';
    }
    await shell(cmd, { ctx, args });
  } else {
    await shell('npm version prerelease');
    await shell('lsk run publish', { ctx, args });
  }
};

module.exports = run(main);
