import Module from '@lskjs/module';
import db from '@lskjs/db/server';
import forEach from 'lodash/forEach';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';

export default class extends Module {
  name = 'Worker';
  async init() {
    super.init();
    this.log.trace('Worker init');
    this.db = await this.getDatabase();
  }
  async afterInit() {
    this.models = this.getMongooseModels();
    this.log.debug('models', Object.keys(this.models));
    await this.runModels();
  }
  async run(...args) {
    await super.run(...args);
    this.log.trace('Worker.run');
    if (this.db) await this.db.run();
  }
  afterRun() {
    this.log.trace('Worker afterRun @@@@');
  }
  getDatabase() {
    return this.config.db ? db(this, this.config.db) : null;
  }
  getMongooseModels() {
    const models = this.getModels();
    forEach(this.modules, (mdl, moduleName) => {
      let models2 = {};
      if (mdl.getModels) {
        models2 = mdl.getModels();
      } else if (mdl.models) {
        models2 = mdl.models;
      }
      // console.log('models2', Object.keys(models2));
      forEach(models2, (model, modelName) => {
        if (models[modelName]) {
          this.log.error(`WorkerApp.getMongooseModels: CONFLICT modules/${moduleName}/${modelName}`); // eslint-disable-line no-console
          return;
        }
        models[modelName] = models2[modelName];
      });
    });
    return mapValues(models, (model) => {
      if (model._universal) {
        return model.getMongooseModel(this.db);
      }
      return model;
    });
  }
  getModels() {
    return {};
  }
  runModels() {
    const promises = map(this.models, async (model, name) => {
      if (model.run) {
        this.models[name] = await model.run(this);
      }
    });
    return Promise.all(promises);
  }
  async stop() {
    await super.stop();
    if (this.db) await this.db.stop();
  }
  async started() {
    console.log('🎃 The worker is running');
  }
}
