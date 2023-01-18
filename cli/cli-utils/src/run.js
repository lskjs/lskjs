const path = require('path');
const { getLskConfig } = require('./getLskConfig');
const { joinArgs } = require('./joinArgs');
const { log } = require('./log');

const run = async (main) => {
  if (!process.pathexec) process.pathexec = {};
  let isRootRun = false;
  if (!process.pathexec.rootRun) {
    isRootRun = true;
    const [shell, filename, ...args] = process.argv;
    const config = getLskConfig();
    const cwd = process.cwd();

    const ctx = {
      stack: [
        {
          command: `lsk ${joinArgs(args)}`,
          log,
        },
      ],
    };
    const rootRun = {
      shell,
      filename,
      args,
      cwd,
      isRoot: path.dirname(config?.path) === cwd,
    };
    // log.trace('[run]', rootRun);
    rootRun.config = config;
    rootRun.log = log;
    rootRun.ctx = ctx;

    process.pathexec.rootRun = rootRun;
  } else {
    // log.trace('[run??]');
  }
  const runnable = (preprops = {}) => {  //eslint-disable-line
    const props = {
      // ...process.pathexec.rootRun,
      ...(isRootRun ? process.pathexec.rootRun : {}),
      cwd: process.pathexec.rootRun.cwd,
      config: process.pathexec.rootRun.config,
      log: process.pathexec.rootRun.log,
      ctx: process.pathexec.rootRun.ctx,
      ...preprops,
    };
    // console.log('[runnable]', props);
    return main(props).catch((err) => {
      const errTitle = `========= ========= [Err] ${
        err.code || ''
      } ======= =========`;
      // eslint-disable-next-line no-console
      console.log('\n\n\n\n');
      log.fatal();
      log.fatal(errTitle);
      log.fatal();
      if (props.args?.length)
        log.fatal(`[>>] lsk run ${props.args.slice(1).join(' ')}`);
      if (err?.proc?.spawnargs)
        log.fatal('[>>]', joinArgs(err?.proc?.spawnargs));
      if (err.code) log.fatal('[Err]', err.code);
      if (err.message) log.fatal('[Err]', err.message);
      if (err.stack) log.fatal('[Err]', err);
      // log.fatal('[Err]', err.message || err.proc._events);
      if (props.ctx?.stack) {
        log.fatal();
        if (props.cwd) log.fatal(`[cwd] ${props.cwd}`);
        if (props.ctx.stack?.[0]?.filename)
          log.fatal(`[filename] ${props.ctx.stack[0].filename}`);
        log.fatal(
          '[History]',
          props.ctx?.stack
            .reverse()
            .map((s) => `\n - [>>] ${s.command}`)
            .join('')
        );
      }
      if (err.code === 'LSKJS_MISSING_SCRIPT') {
        log.fatal();
        const { pathOptions } = err.data;
        const { paths } = err.data;
        const filteredPaths = paths.filter((p) => p.endsWith('.js'));
        if (filteredPaths.length > 0) {
          log.fatal(
            '[Paths]',
            filteredPaths
              .map((p) => `\n  -  ${p}`)
              .slice(0, 5)
              .join('') + (filteredPaths.length > 5 ? '\n ...' : '')
          );
        }
        log.trace(pathOptions, '=>', paths);
      }
      if (err.stdout) log.error('err.stdout', err.stdout);
      if (err.stderr) log.error('err.stderr', err.stderr);
      log.trace('args:', props.args);
      log.trace('process.argv:', process.argv);
      log.trace('[props]', props);
      log.fatal();
      log.fatal(errTitle);
      log.fatal();
      process.exit(1);
    });
  };

  if (isRootRun) {
    const props = {
      rootRun: process.pathexec.rootRun,
      args: process.pathexec.rootRun.args,
    };
    return runnable(props);
  }
  return { main: runnable };
};

module.exports = {
  run,
};
