import { IApp, IModule } from './types';
import { ModuleWithSubmodules } from './ModuleWithSubmodules';

// export abstract class ModuleWithApp extends ModuleWithSubmodules {
//   app?: IApp;
// }

export abstract class Module2 extends ModuleWithSubmodules implements IModule {
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

export const Module = Module2


export default Module2;
