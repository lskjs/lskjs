// import Module from '@lskjs/module';
import { Module } from '@lskjs/module';
import mapValues from 'lodash/mapValues';

export class ModelsModule extends Module {
  async getModels() {
    return {
      ...(this.models || {}),
      ...(this.__models || {}),
    };
  }

  setProp(key, value) {
    if (key === 'models') return super.setProp('__models', value);
    return super.setProp(key, value);
  }

  async moduleGetter(m) {
    if (!m.dbName) throw '!this.dbName';
    await m.app.module(m.dbName, { run: true });
    return m.model;
  }

  async getModules() {
    const models = await this.getModels();
    return {
      ...super.getModules(),
      ...mapValues(models, (Model) => [() => import('./ModelModule'), { Model }]),
    };
  }
}

export default ModelsModule;
