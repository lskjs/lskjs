import { IModuleWithСonfig } from './types';
import { ModuleWithWorkflow } from './ModuleWithWorkflow';

export abstract class ModuleWithConfig extends ModuleWithWorkflow implements IModuleWithСonfig {
  config: { [key: string]: any };
  /**
   * config from constructor
   */
  __config: { [key: string]: any };
  async setProp(key: string, value: any): Promise<void> {
    if (key === 'config') return super.setProp('__config', value);
    return super.setProp(key, value);
  }
  async getConfig(): Promise<object> {
    return {
      ...(this.config || {}),
      // ...this.defaultConfig,
      ...(this.__config || {}),
    };
  }
  async init(): Promise<void> {
    await super.init();
    if (!this.config) this.config = {};
    this.config = await this.getConfig();
  }
}

export default ModuleWithConfig;
