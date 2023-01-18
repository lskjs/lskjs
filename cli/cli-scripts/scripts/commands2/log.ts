#!/usr/bin/env node
import { Command } from '@oclif/command';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { stdin } = process;

export class LogCommand extends Command {
  async run() {
    require('@lskjs/log/cli');
  }
}

export default LogCommand;
