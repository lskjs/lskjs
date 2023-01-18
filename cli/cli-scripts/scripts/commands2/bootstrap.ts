// @ts-ignore
import { shell } from '@lskjs/cli-utils';
import { Command } from '@oclif/command';

export class BootstrapCommand extends Command {
  async run() {
    await shell('lsk run bootstrap');
  }
}

export default BootstrapCommand;
