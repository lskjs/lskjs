import { ModuleWithSubmodules } from './ModuleWithSubmodules';
import { IApp, IModule } from './types';

// export abstract class ModuleWithApp extends ModuleWithSubmodules {
//   app?: IApp;
// }

export abstract class Module extends ModuleWithSubmodules implements IModule {
  app?: IApp;
  debug = false;
  async getModuleProps(name: string): Promise<Record<string, any>> {
    return {
      ...(await super.getModuleProps(name)),
      __parent: this,
      app: this.app || this,
    };
  }
}

export const Module2 = Module;

export default Module;
