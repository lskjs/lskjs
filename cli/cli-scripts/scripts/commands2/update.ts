// @ts-ignore
import { shell } from '@lskjs/cli-utils';
import { Command } from '@oclif/command';

export class UpdateCommand extends Command {
  async run() {
    await shell('lsk run update:starter-kit');
    await shell('lsk run npm:install');
    await shell('lsk run npm:update');
    await shell('lsk run bootstrap');
  }
}

export default UpdateCommand;
