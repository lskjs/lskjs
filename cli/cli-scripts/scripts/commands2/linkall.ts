#!/usr/bin/env node
// @ts-ignore
import { checkSoft, linkAll } from '@lskjs/cli-utils';
import { Command, flags } from '@oclif/command';

export class LinkallCommand extends Command {
  async run() {
    const {
      args: { config: configPath },
      flags: { nodemodules, git },
    } = this.parse(LinkallCommand);
    await checkSoft(['rsync']);
    // eslint-disable-next-line import/no-dynamic-require
    const config = require(`${process.cwd()}/${configPath}`);
    await linkAll(config, { nodemodules, git });
  }
}

LinkallCommand.description = `Recursive watching and incremental copy dirs with rsync
...
`;

LinkallCommand.args = [
  {
    name: 'config',
    required: true,
  },
];

LinkallCommand.flags = {
  nodemodules: flags.string({
    char: 'n',
    description: 'include node_modules folder',
  }),
  git: flags.string({ char: 'g', description: 'include .git folder' }),
};

export default LinkallCommand;
