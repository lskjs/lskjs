// import SHA256 from 'crypto-js/sha256';
import Err from '@lskjs/err';
import Module from '@lskjs/module';
import get from 'lodash/get';
import { customAlphabet, nanoid, urlAlphabet } from 'nanoid';

import config from './config';
// import models from './models';

export class PermitServerModule extends Module {
  config = config;

  async getConfig() {
    return {
      ...(await super.getConfig()),
      ...get(this, 'config', {}),
      ...get(this, '__config', {}),
      scenarios: {
        ...get(this, 'config.scenarios', {}),
        ...get(this, '__config.scenarios', {}),
      },
    };
  }

  // async init() {
  //   await super.init();
  //   // const modelsModule = await this.module('models');
  //   // this.model = modelsModule.model.bind(models);
  // }

  // getModules() {
  //   return {
  //     ...super.getModules(),
  //     // models: [() => import('@lskjs/models'), { models }],
  //   };
  // }

  createExpiredAt(scenario, params = {}) {
    let scenarioConfig = this.config.scenarios[scenario];
    if (!scenarioConfig) {
      scenarioConfig = this.config.scenarios.default;
    }
    scenarioConfig = {
      ...scenarioConfig,
      ...params,
    };
    const time = scenarioConfig.time || 60 * 60 * 1000;

    return new Date(Date.now() + time);
  }

  genCode(scenario, params = {}) {
    let scenarioConfig = this.config.scenarios[scenario];
    if (!scenarioConfig) {
      scenarioConfig = this.config.scenarios.default;
    }
    scenarioConfig = {
      ...scenarioConfig,
      ...params,
    };
    if (scenarioConfig.uniq) return this.generateUniqCode(scenarioConfig);
    return this.generateCode(scenarioConfig);
  }

  generateCode({ type = 'hex', length = 10 } = {}) {
    if (type === 'number') {
      return customAlphabet('1234567890', length)();
    }
    if (type === 'hex') {
      return customAlphabet('1234567890abcdef', length)();
    }
    if (type === 'url') {
      return customAlphabet(urlAlphabet, length)();
    }
    // if (type === 'hash') {
    throw new Err('NOT_IMPLEMENTED');
  // }
    // return nanoid(length);
  }
  async generateUniqCode(params, iteration = 0) {
    const PermitModel = await this.model('PermitModel');
    // throw new Err('!code');
    // if (iteration) {
    //   str2 += Math.floor(Math.random() * 100000);
    // }
    if (iteration > 10) throw new Err('cant create uniq code');
    const code = this.generateCode(params);
    // ...criteria
    const permit = await PermitModel.findOne({ code }).select('_id');
    if (permit) return this.generateUniqCode(params, iteration + 1);
    return code;
  }
}

export default PermitServerModule;
