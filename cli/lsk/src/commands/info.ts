#!/usr/bin/env node
import { Command } from '@oclif/command';

import { getLogo } from '../utils/getLogo';
import { printInfo } from '../utils/printInfo';

export class InfoCommand extends Command {
  async run() {
    this.log(getLogo(this));
    printInfo(this);
  }
}

export default InfoCommand;
