import mapValues from 'lodash/mapValues';

import Module from '../../src';

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
    await m.app.module('db', { run: true });
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
