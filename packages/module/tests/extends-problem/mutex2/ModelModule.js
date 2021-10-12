import Err from '@lskjs/err';

import Module from '../../../src/Module';

export class ModelModule extends Module {
  async createModel() {
    const db = await this.app.module('db', { run: true });
    if (!db) throw new Err('!db');
    if (!db.connected) throw new Err('!db.connected');

    return this.Model;
  }
  async run() {
    await super.run();
    this.model = await this.createModel();
  }
}

export default ModelModule;
