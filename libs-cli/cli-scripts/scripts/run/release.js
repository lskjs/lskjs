#!/usr/bin/env node
const { run, shell, getCwdInfo } = require('@lskjs/cli-utils');
const { isCI } = require('@lskjs/env');

const main = async ({ ctx, args, isRoot, cwd } = {}) => {
  // await shell('lsk run clean');
  const isYes = args.includes('--yes');
  // eslint-disable-next-line no-param-reassign
  args = args.filter((arg) => arg !== '--yes');

  // libs
  if (isRoot) {
    // await shell('lsk run fix', { ctx, args }); // NOTE: --prod --silent
    // TODO: break if changes
    await shell('LSK_SILENT=1 lsk run build', { ctx, args }); // NOTE: --prod --silent
    await shell('LSK_SILENT=1 lsk run test', { ctx, args }); // NOTE: --prod --silent
    await shell('lsk run prepack --dir .release', { ctx, args }); // TODO: два раза вызывается prepack, is it ok?
    // const libs = (config.packages || []).filter((p) => p.type === 'lib');
    const hasAnyLib = true; // libs.length
    if (hasAnyLib) {
      // await shell('lsk run prepack --dir .release', { ctx, args }); // два раза вызывается prepack
      let cmd = 'lerna publish --no-push --contents .release';
      if (isYes) {
        cmd += ' --yes';
      }
      await shell(cmd, { ctx, args });
      if (!isCI || args.includes('--no-push')) {
        await shell('git push --follow-tags');
      }
    }
    // const apps = (config.packages || []).filter((p) => p.type === 'app');
    // if (apps.length) {
    //   // await shell('lsk run prepack --dir .release', { ctx, args });
    //   // await shell('lsk run deploy', { ctx, args });
    // }
  } else {
    const { isLib, isNext } = getCwdInfo({ cwd });
    if (isLib) {
      await shell('pnpm run build', { ctx, args }); // NOTE: --prod --silent
      await shell('pnpm run test', { ctx, args }); // NOTE: --prod --silent
      await shell('npm version prerelease --preid alpha');
      await shell('lsk run prepack --dir .release', { ctx, args });
      await shell('lsk run publish', { ctx, args });
    } else if (isNext) {
      await shell('pnpm -F "." deploy .release', { ctx, args });
      await shell('pnpm run build', { ctx, args, cwd: `${cwd}/.release` });
    } else {
      await shell('pnpm run build', { ctx, args });
      await shell('pnpm -F "." deploy .release', { ctx, args });
    }
  }
};

module.exports = run(main);
