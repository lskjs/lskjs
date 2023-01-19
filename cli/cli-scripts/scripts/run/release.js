#!/usr/bin/env node
const { run, shell, getCwdInfo } = require('@lskjs/cli-utils');
const { isCI } = require('@lskjs/env');

const main = async ({ ctx, args, isRoot, config, cwd } = {}) => {
  // await shell('lsk run clean');

  // libs
  if (isRoot) {
    await shell('lsk run fix --prod --silent', { ctx, args });
    // TODO: break if changes
    await shell('lsk run build --prod --silent', { ctx, args });
    await shell('lsk run test --prod --silent', { ctx, args });
    const libs = (config.packages || []).filter((p) => p.type === 'lib');
    if (libs.length) {
      await shell('lsk run prepack --dir .release', { ctx, args }); // два раза вызывается prepack
      let cmd = 'lerna publish --no-push --contents .release';
      const isYes = args.includes('--yes');
      if (isYes) {
        cmd += ' --yes';
      }
      await shell(cmd, { ctx, args });
      if (!isCI || args.includes('--no-push')) {
        await shell('git push --follow-tags');
      }
    }
    const apps = (config.packages || []).filter((p) => p.type === 'app');
    if (apps.length) {
      await shell('lsk run prepack --dir .release', { ctx, args });
      // await shell('lsk run deploy', { ctx, args });
    }
  } else {
    await shell('pnpm run build --prod --silent', { ctx, args });
    await shell('pnpm run test --prod --silent', { ctx, args });
    const { isLib } = getCwdInfo({ cwd });
    if (isLib) {
      await shell('npm version prerelease');
      await shell('lsk run prepack --dir .release', { ctx, args });
      await shell('lsk run publish', { ctx, args });
    } else {
      await shell('lsk run prepack --dir .release', { ctx, args });
      // await shell('lsk run deploy', { ctx, args });
    }
  }
};

module.exports = run(main);
