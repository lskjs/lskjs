import { Schema } from 'mongoose';
import Module from '@lskjs/module';
import importFn from '@lskjs/utils/importFn';

export class ModelModule extends Module {
  Schema = Schema;
  Model = null;
  model = null;
  db = 'db';
  async createModel() {
    const db = await this.app.module(this.db);
    if (!db) {
      this.log.error('!db');
      throw '!db';
    }
    if (!db.client) {
      this.log.error('!db.client');
      throw '!db.client';
    }
    if (!this.Model) {
      this.log.error('!db.client');
      throw '!Model';
    }
    const Model = await importFn(this.Model);
    const { model: modelName, collection, ...options } = Model.options || {};
    if (!modelName) throw '!options.model';
    if (!collection) throw '!options.collection';
    const schema = new this.Schema(Model.schema, options);
    schema.loadClass(Model);
    return db.client.connection.model(modelName, schema, collection);
  }
  async run() {
    await super.run();
    this.model = await this.createModel();
  }
}

export default ModelModule;
