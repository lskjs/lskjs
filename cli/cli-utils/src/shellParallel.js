const { shell } = require('./shell');
const { lernaParallel } = require('./lernaParallel');
const { Err } = require('@lskjs/err');
const { joinArgs } = require('.');

async function shellParallel(command, options = {}) {
  let cmd = command;
  const npmClient = options.npmClient || 'pnpm';
  if (npmClient === 'lerna') {
    if (options.args) cmd += ` ${joinArgs(options.args)}`;
    return lernaParallel(
      `exec ${options.noPrefix ? '--no-prefix' : ''} -- ${cmd}`
    );
  }
  if (npmClient === 'pnpm') {
    return shell(`pnpm -r --parallel exec ${cmd}`, options);
  }

  throw new Err('LSK_NPM_CLIEN', `Unknown npmClient: ${npmClient}`, {
    command,
    options,
    cmd,
  });
}

module.exports = {
  shellParallel,
};
