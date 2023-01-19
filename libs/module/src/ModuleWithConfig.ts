import { ModuleWithLifecycle } from './ModuleWithLifecycle';
import { IModuleWithСonfig } from './types';

export abstract class ModuleWithConfig extends ModuleWithLifecycle implements IModuleWithСonfig {
  // @ts-ignore
  config: { [key: string]: any };
  /**
   * config from constructor
   */
  // @ts-ignore
  __config: { [key: string]: any };
  async setProp(key: string, value: any): Promise<void> {
    if (key === 'config') return super.setProp('__config', value);
    return super.setProp(key, value);
  }
  async getConfig(): Promise<Record<string, any>> {
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
