import mapValues from 'lodash/mapValues';

import Module from '../../src/Module';

export class ModelsModule extends Module {
  async getModels() {
    return {
      ...(this.models || {}),
      ...(this.__models || {}),
    };
  }

  setProp(key, value) {
    // @ts-ignore
    if (key === 'models') return super.setProp('__models', value);
    // @ts-ignore
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
