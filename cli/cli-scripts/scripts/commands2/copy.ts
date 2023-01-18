/* eslint-disable max-len */
// @ts-ignore
import { checkSoft, copy } from '@lskjs/cli-utils';
import { Command, flags } from '@oclif/command';

export class CopyCommand extends Command {
  async run() {
    const {
      args: { from, to },
      flags: { nodemodules, git },
    } = this.parse(CopyCommand);
    await checkSoft(['rsync']);
    await copy({
      from,
      to,
      nodemodules,
      git,
    });
  }
}

CopyCommand.description = `Recursive incremental copy dirs with rsync
...

`;

CopyCommand.args = [
  {
    name: 'from',
    required: true,
  },
  {
    name: 'to',
    required: true,
  },
];

CopyCommand.flags = {
  nodemodules: flags.string({
    char: 'n',
    description: 'include node_modules folder',
  }),
  git: flags.string({ char: 'g', description: 'include .git folder' }),
};

export default CopyCommand;
