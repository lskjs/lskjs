#!/usr/bin/env node
const { run, shell, getCwdInfo } = require('@lskjs/cli-utils');
const { isCI } = require('@lskjs/env');

const omitNull = (obj) => {
  const res = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] != null) {
      res[key] = obj[key];
    }
  });
  return res;
};

const main = async ({ ctx, args, isRoot, cwd } = {}) => {
  // await shell('lsk run clean');
  const isYes = args.includes('--yes');
  const isProd = args.includes('--prod');
  const isSilent = args.includes('--silent');

  // eslint-disable-next-line no-param-reassign
  args = args.filter((arg) => arg !== '--yes' && arg !== '--prod' && arg !== '--silent');

  // libs
  if (isRoot) {
    const env = {
      ...process.env,
      LSK_SILENT: '1',
      LSK_PROD: '1',
    };
    // await shell('lsk run fix', { ctx, args }); // NOTE: --prod --silent
    // TODO: break if changes
    await shell('lsk run build', { ctx, args, env }); // NOTE: --prod --silent
    await shell('lsk run test', { ctx, args, env }); // NOTE: --prod --silent
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
    const env = omitNull({
      ...process.env,
      LSK_SILENT: isSilent ? '1' : null,
      LSK_PROD: isProd ? '1' : null,
    });
    const { isLib, isNext } = getCwdInfo({ cwd });
    if (isLib) {
      await shell('pnpm run build', { ctx, args, env }); // NOTE: --prod --silent
      await shell('pnpm run test', { ctx, args, env }); // NOTE: --prod --silent
      await shell('npm version prerelease --preid alpha');
      await shell('lsk run prepack --dir .release', { ctx, args });
      await shell('lsk run publish', { ctx, args });
    } else if (isNext) {
      await shell('pnpm -F "." deploy .release', { ctx, args });
      await shell('pnpm run build', { ctx, args, cwd: `${cwd}/.release`, env });
    } else {
      await shell('pnpm run build', { ctx, args, env });
      await shell('pnpm -F "." deploy .release', { ctx, args });
    }
  }
};

module.exports = run(main);
