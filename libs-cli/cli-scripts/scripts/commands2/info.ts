#!/usr/bin/env node
// @ts-ignore
import { getLogo } from '@lskjs/cli-utils';
import { Command } from '@oclif/command';

import { printInfo } from '../utils';

export class InfoCommand extends Command {
  async run() {
    // eslint-disable-next-line no-console
    this.log(getLogo(this));
    printInfo(this);
  }
}

export default InfoCommand;
