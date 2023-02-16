#!/usr/bin/env node
// @ts-ignore
import { checkSoft, link } from '@lskjs/cli-utils';
import { Command, flags } from '@oclif/command';

export class LinkCommand extends Command {
  async run() {
    const {
      args: { from, to },
      flags: { nodemodules, git },
    } = this.parse(LinkCommand);
    await checkSoft(['rsync']);
    await link({ from, to, nodemodules, git });
  }
}

LinkCommand.description = `Recursive watching and incremental copy dirs with rsync
...
`;

LinkCommand.args = [
  {
    name: 'from',
    required: true,
  },
  {
    name: 'to',
    required: true,
  },
];

LinkCommand.flags = {
  nodemodules: flags.string({
    char: 'n',
    description: 'include node_modules folder',
  }),
  git: flags.string({ char: 'g', description: 'include .git folder' }),
};

export default LinkCommand;
