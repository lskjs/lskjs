// const { exec } = require('@pnpm/plugin-commands-script-runners');
// const { readProjects } = require('@pnpm/filter-workspace-packages');

const { shell } = require('./shell');
// const pnpmExec = require('@pnpm/exec').default;
// const { lernaParallel } = require('./lernaParallel');
const { Err } = require('@lskjs/err');
// const { joinArgs } = require('./joinArgs');
// const pnpm = require('@pnpm/core');

// console.log({ pnpm });
async function shellParallel(command, options = {}) {
  const cmd = command;
  const npmClient = options.npmClient || 'pnpm';
  // if (npmClient === 'lerna') {
  //   if (options.args) cmd += ` ${joinArgs(options.args)}`;
  //   return lernaParallel(
  //     `exec ${options.noPrefix ? '--no-prefix' : ''} -- ${cmd}`
  //   );
  // }
  if (npmClient === 'pnpm') {
    return shell(`pnpm -r --parallel exec ${cmd}`, options);
  }
  // if (npmClient === 'pnpm-api') {
  //   const params = [
  //     ...command.split(' ').filter(Boolean),
  //     ...(options.args || []),
  //   ];
  //   const { selectedProjectsGraph } = await readProjects(process.cwd(), []);
  //   const res = await exec.handler(
  //     {
  //       dir: process.cwd(),
  //       recursive: true,
  //       selectedProjectsGraph,
  //       extraBinPaths: [],
  //     },
  //     params
  //   );
  //   return res;
  // }

  throw new Err('LSK_NPM_CLIENT', `Unknown npmClient: ${npmClient}`, {
    command,
    options,
    cmd,
  });
}

module.exports = {
  shellParallel,
};
