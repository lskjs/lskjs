import { IApp, IModule } from './types';
import { ModuleWithSubmodules } from './ModuleWithSubmodules';

// export abstract class ModuleWithApp extends ModuleWithSubmodules {
//   app?: IApp;
// }

export abstract class Module extends ModuleWithSubmodules implements IModule {
  app?: IApp;
  debug = false;

  async init(): Promise<void> {
    await super.init();
    // this.log.trace('kjsadghfjkahsjkdh')
  }
  async getModuleProps(name: string): Promise<object> {
    return {
      ...(await super.getModuleProps(name)),
      app: this.app || this,
    };
  }
}

export const Module2 = Module


export default Module;
