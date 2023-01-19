#!/usr/bin/env node
/* eslint-disable max-len */
// @ts-ignore
import { getLogo, isDebug, shell } from '@lskjs/cli-utils';
import { Command, flags } from '@oclif/command';

import { gitDownload, printInfo } from '../utils';

export class InitCommand extends Command {
  async run() {
    const {
      args: { projectName },
      flags: { template },
    } = this.parse(InitCommand);
    this.log('===== 🚀 Preparing for launght 🚀 =====');
    printInfo(this);
    this.log("============ 🚀 Let's go 🚀 ============");

    await gitDownload(template || 'https://github.com/lskjs/kit.git', {
      dest: projectName,
    });

    // await shell(`git clone --depth=1 https://github.com/lskjs/kit.git ${projectName} && rm -rf ${projectName}/.git`);
    this.log('====== 🚀 First stage dropped 🚀 ======');
    const npmInstallParams = isDebug() ? '' : '--no-fund --no-audit --loglevel=error';
    // await shell(
    //   `npm i ${npmInstallParams} -g lerna nodemon npm-check-updates`,
    //   {
    //     cwd: projectName,
    //   }
    // );
    const cwd = `${process.cwd()}/${projectName}`;
    await shell(`npm i ${npmInstallParams}`, { cwd });
    this.log('====== 🚀 Second stage dropped 🚀 ======');
    await shell(`lsk run bootstrap`, { cwd });
    this.log('======== 🚀 Landed successful 🚀 =========');
    this.log(getLogo(this));
    this.log(``);
    this.log(`now you should do: cd ${projectName} && npm run dev`);
    this.log(``);
    this.log(`========= 🚀 CONGRATULATION 🚀 =========`);
  }
}

InitCommand.description = `Init new LSK.js project
...
Extra documentation goes here
`;

InitCommand.args = [
  {
    name: 'projectName',
    required: true,
  },
];

InitCommand.flags = {
  template: flags.string({
    char: 't',
    description:
      'An example to bootstrap the app with. You can use an example name from the LSK.js repo or a GitHub URL. The URL can use any branch and/or subdirectory.',
  }),
};

export default InitCommand;
