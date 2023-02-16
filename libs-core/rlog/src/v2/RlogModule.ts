import Err from '@lskjs/err';
import { Module } from '@lskjs/module';
import omit from 'lodash/omit';

import { Rlog } from './Rlog';

export class RlogModule extends Module {
  client: any;

  getOptions(): any {
    const options = omit(this.config, ['log', 'debug']);
    if (this.config.logs) {
      options.log = this.log;
    }
    return options;
  }
  async init(): Promise<void> {
    await super.init();
    this.client = new Rlog(this.getOptions());
  }
  async send(...args: any[]): Promise<void> {
    if (!this.client) throw new Err('!this.client');
    await this.client.send(...args);
  }
  async trace(...args: any[]): Promise<void> {
    if (!this.client) throw new Err('!this.client');
    await this.client.trace(...args);
  }
  async start(...args: any[]): Promise<void> {
    if (!this.client) throw new Err('!this.client');
    await this.client.start(...args);
  }
  async success(...args: any[]): Promise<void> {
    if (!this.client) throw new Err('!this.client');
    await this.client.success(...args);
  }
  async info(...args: any[]): Promise<void> {
    if (!this.client) throw new Err('!this.client');
    await this.client.info(...args);
  }
  async warn(...args: any[]): Promise<void> {
    if (!this.client) throw new Err('!this.client');
    await this.client.warn(...args);
  }
  async error(...args: any[]): Promise<void> {
    if (!this.client) throw new Err('!this.client');
    await this.client.error(...args);
  }
  async fatal(...args: any[]): Promise<void> {
    if (!this.client) throw new Err('!this.client');
    await this.client.fatal(...args);
  }
}

export default RlogModule;
