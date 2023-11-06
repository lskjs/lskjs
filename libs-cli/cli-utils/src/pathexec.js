/* eslint-disable import/no-dynamic-require */
const { Err } = require('@lskjs/err');
const { joinArgs } = require('./joinArgs');
const { getPackageName, isRoot } = require('./cwdInfo');

const { findPath } = require('./findPaths');
const { getPaths } = require('./getPaths');
const { getShortPath } = require('./getShortPath');
const { createLogger } = require('./log');

// pathexec some-script arg1 arg2 -- some bare args

// Execute some of node.js script from PATHS

// principles
// 1. if script is not found in paths - throw error

// 2. can run directly by path
// pathexec ./some-script arg1 arg2 -- some bare args

// command - script name that will find in paths and execute
// options.name  - name of package
// options.cwd - current working directory
// options.log || options.logger - logger

async function pathexec(command, options = {}) {
  const [script, ...initArgs] = command.trim().split(' ').filter(Boolean);
  const args = [...initArgs, ...(options.args || [])];
  const cwd = options.cwd || process.cwd();
  const ctx = options.ctx || process.pathexec?.ctx || {};
  if (!ctx.stack) ctx.stack = [];
  let cmd = `lsk run ${command} ${joinArgs(args)}`;
  ctx.stack.unshift({ command: cmd, options });
  process.env.pathexec = { cwd };
  const packageName = options.name || getPackageName({ cwd });
  const name = script.replace(/:/g, '-');
  const isSilent =
    (typeof process && (!!+process.env.LSK_SILENT || process.argv?.includes('--silent'))) ||
    options?.env?.LSK_SILENT;
  const logOptions = {
    name: packageName,
  };
  if (isSilent) {
    logOptions.level = 'error';
  }
  const log = options.log || createLogger(logOptions);
  const pathOptions = {
    name,
    exts: ['.sh', '.js'],
    nodemodules: 1,
    local: 1,

    script: name,
  };
  const scriptPath = findPath(pathOptions);
  if (args.includes('--explain')) {
    cmd += `  (${getShortPath(scriptPath)})`;
  }
  log.debug(`[>>] ${cmd}`); // , { cwd }
  ctx.stack[0].filename = scriptPath;
  if (!scriptPath) {
    const errMessage = `Missing script: "${script}"`;
    throw new Err('LSKJS_MISSING_SCRIPT', errMessage, {
      data: {
        pathOptions,
        paths: getPaths(pathOptions),
      },
    });
  }
  let res;
  // eslint-disable-next-line no-useless-catch
  try {
    log.trace(`[>] require ${getShortPath(scriptPath)}`);
    const content = await require(scriptPath);
    let runnable;
    if (typeof content === 'function') {
      runnable = content;
    } else if (content?.run && typeof content.run === 'function') {
      runnable = content.run;
    } else if (content?.main && typeof content.main === 'function') {
      runnable = content.main;
    } else {
      log.warn(`[!incorrectExports] ${scriptPath}`);
      return null;
    }
    if (runnable) {
      res = await runnable({
        cwd,
        isRoot: isRoot({ cwd }),
        args,
        options,
        ctx,
        log,
      });
    }
    ctx.stack.shift();
  } catch (err) {
    throw err;
  }
  return res;
}

module.exports = {
  pathexec,
};
