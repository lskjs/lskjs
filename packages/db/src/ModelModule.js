import Module from '@lskjs/module';
// @ts-ignore
import importFn from '@lskjs/utils/importFn';
import { Schema } from 'mongoose';

export class ModelModule extends Module {
  Schema = Schema;
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
    const Model = await importFn(this.Model);
    const mergedOptions = { ...(Model.defaultOptions || {}), ...(Model.options || {}) };
    const { model: modelName, collection, ...options } = mergedOptions;
    if (!modelName) throw '!options.model';
    if (!collection) throw '!options.collection';
    const schema = new this.Schema(Model.schema, options);
    schema.statics.app = this.app;
    schema.loadClass(Model);
    if (Model.initSchema) await Model.initSchema(schema);
    const mongooseModel = db.client.connection.model(modelName, schema, collection);
    return mongooseModel;
  }
  async run() {
    // : Promise<void>
    await super.run();
    this.model = await this.createModel();
  }
}

export default ModelModule;
