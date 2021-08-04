import Module from '@lskjs/module';
// @ts-ignore
import importFn from '@lskjs/utils/importFn';

export class ModelModule extends Module {
  Model = null;
  model = null;
  dbName = 'db';
  async createModel() {
    // : Promise<any>
    if (!this.dbName) throw '!this.dbName';
    const db = await this.app.module(this.dbName, { run: true });
    if (!db.client) {
      this.log.error('!db.client');
      throw '!db.client';
    }
    if (!this.Model) {
      this.log.error('!Model');
      throw '!Model';
    }
    const getModel = await importFn(this.Model);
    const model = await getModel(db, this.app);
    return model;
  }
  async run() {
    // : Promise<void>
    await super.run();
    this.model = await this.createModel();
  }
}

export default ModelModule;
