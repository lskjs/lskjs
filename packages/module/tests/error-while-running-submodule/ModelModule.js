import Module from '../../src';

export class ModelModule extends Module {
  async createModel() {
    const db = await this.app.module('db', { run: true });
    if (!db) throw '!db';
    if (!db.connected) throw '!db.connected';

    return this.Model;
  }
  async run() {
    await super.run();
    this.model = await this.createModel();
  }
}

export default ModelModule;
